#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

failures=0

jsx_files=()
while IFS= read -r file; do
  jsx_files+=("$file")
done < <(find src -type f \( -name '*.tsx' -o -name '*.jsx' \) | sort)

scss_files=()
while IFS= read -r file; do
  scss_files+=("$file")
done < <(find src -type f -name '*.scss' | sort)

report_matches() {
  local title="$1"
  local pattern="$2"
  shift 2
  local files=("$@")

  if [[ ${#files[@]} -eq 0 ]]; then
    return
  fi

  local output=""
  output=$(grep -nHE "$pattern" "${files[@]}" || true)

  if [[ -n "$output" ]]; then
    failures=$((failures + 1))
    echo ""
    echo "[$title]"
    echo "$output"
  fi
}

echo "Checking style scoping (Option B: prefixed global styles)..."

# 1) Disallow hardcoded className literals in React components.
report_matches \
  "Hardcoded className string literal" \
  'className[[:space:]]*=[[:space:]]*"[^"]+"' \
  "${jsx_files[@]}"

report_matches \
  "Hardcoded className string expression (single quotes)" \
  "className[[:space:]]*=[[:space:]]*\\{[[:space:]]*'[^']+'[[:space:]]*\\}" \
  "${jsx_files[@]}"

report_matches \
  "Hardcoded className string expression (double quotes)" \
  'className[[:space:]]*=[[:space:]]*\{[[:space:]]*"[^"]+"[[:space:]]*\}' \
  "${jsx_files[@]}"

# 2) Disallow template-literal className unless scoped via withPrefix()/styles.
template_class_lines=""
if [[ ${#jsx_files[@]} -gt 0 ]]; then
  template_class_lines=$(grep -nHF 'className={`' "${jsx_files[@]}" || true)
fi

if [[ -n "$template_class_lines" ]]; then
  unscoped_template_lines=$(printf '%s\n' "$template_class_lines" | grep -Ev 'withPrefix\(|styles\.' || true)
  if [[ -n "$unscoped_template_lines" ]]; then
    failures=$((failures + 1))
    echo ""
    echo "[Template className without withPrefix/styles]"
    echo "$unscoped_template_lines"
  fi
fi

# 3) Disallow raw class selectors in SCSS (must be namespaced via #{$prefix} + &--...).
report_matches \
  "Raw SCSS class selector (unscoped)" \
  '^[[:space:]]*\.[A-Za-z_][A-Za-z0-9_-]*[[:space:]]*\{' \
  "${scss_files[@]}"

# 4) Ensure non-root SCSS files use shared prefix contract.
missing_contract=()
for file in "${scss_files[@]}"; do
  if [[ "$file" == "src/styles/root-vars.scss" || "$file" == "src/styles/main.scss" ]]; then
    continue
  fi

  if ! grep -qF "@use 'styles/root-vars' as *;" "$file"; then
    missing_contract+=("$file (missing @use 'styles/root-vars' as *;)")
    continue
  fi

  if ! grep -qF '#{$prefix}' "$file"; then
    missing_contract+=("$file (missing #{\$prefix} block)")
  fi
done

if [[ ${#missing_contract[@]} -gt 0 ]]; then
  failures=$((failures + 1))
  echo ""
  echo "[SCSS files missing prefix contract]"
  printf '%s\n' "${missing_contract[@]}"
fi

if [[ "$failures" -gt 0 ]]; then
  echo ""
  echo "Style scoping check failed with $failures violation group(s)."
  exit 1
fi

echo "Style scoping check passed."
