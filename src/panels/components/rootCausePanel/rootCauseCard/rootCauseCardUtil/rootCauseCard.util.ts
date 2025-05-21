import { ApiDefect, ApiSymptom } from "api/api.types";

export class RootCauseCardUtil {

    private static createLookupMaps(activeSymptoms: ApiSymptom[]): {
        symptomToCount: Map<string, number>,
        entityToSymptomsRecords: Map<string, Map<string, ApiSymptom[]>>
    } {
        const symptomToCount = new Map<string, number>();
        const entityToSymptomsRecords = new Map<string, Map<string, ApiSymptom[]>>();

        activeSymptoms.forEach((symptom) => {
            // Update symptom count
            symptomToCount.set(symptom.name, (symptomToCount.get(symptom.name) || 0) + 1);

            if (!entityToSymptomsRecords.has(symptom.entityType)) {
                entityToSymptomsRecords.set(symptom.entityType, new Map<string, ApiSymptom[]>());
            }
            const symptomToSymptomsMap = entityToSymptomsRecords.get(symptom.entityType);
            symptomToSymptomsMap.set(symptom.name, [...(symptomToSymptomsMap.get(symptom.name) || []), symptom]);
        });

        return { symptomToCount, entityToSymptomsRecords };
    }

    private static createServiceSymptomDescription(
        serviceSymptoms: Map<string, ApiSymptom[]>,
        symptomToCount: Map<string, number>,
        activeSymptoms: ApiSymptom[]
    ): { masterSentence: string, secondarySentence: string } {
        const symptomWithHighestCount = Array.from(serviceSymptoms.keys()).reduce((a, b) => 
            serviceSymptoms.get(a)!.length > serviceSymptoms.get(b)!.length ? a : b
        );
        let masterSentence = `${symptomWithHighestCount} on ${serviceSymptoms.get(symptomWithHighestCount)!.length} services`;
        let masterSentenceSymptomCount = serviceSymptoms.get(symptomWithHighestCount)!.length;

        const totalCount = symptomToCount.get(symptomWithHighestCount)!;
        const otherEntitiesCount = totalCount - serviceSymptoms.get(symptomWithHighestCount)!.length;
        
        if (otherEntitiesCount > 0) {
            masterSentence += ` and ${otherEntitiesCount} other.`;
            masterSentenceSymptomCount += otherEntitiesCount;
        }

        const secondarySentenceSymptomCount = activeSymptoms.length - masterSentenceSymptomCount;
        const secondarySentence = secondarySentenceSymptomCount === 0 ? undefined : `${secondarySentenceSymptomCount} other symptoms across entities`;

        return { masterSentence, secondarySentence };
    }

    private static createNonServiceSymptomDescription(
        symptomToCount: Map<string, number>,
        activeSymptoms: ApiSymptom[]
    ): { masterSentence: string, secondarySentence?: string } {
        const symptomWithHighestCount = Array.from(symptomToCount.entries())
            .reduce((a, b) => a[1] > b[1] ? a : b)[0];
        
        const highestCount = symptomToCount.get(symptomWithHighestCount)!;
        const masterSentence = `${symptomWithHighestCount} on ${highestCount} entities`;
        
        const secondarySentenceSymptomCount = activeSymptoms.length - highestCount;
        const secondarySentence = secondarySentenceSymptomCount === 0 ? undefined : 
            `${secondarySentenceSymptomCount} other symptoms across entities`;

        return { masterSentence, secondarySentence };
    }

    public static getSymptomDescription = (defect: ApiDefect): {masterSentence: string, secondarySentence?: string} => {
        if (!defect.symptoms || defect.symptoms.length === 0) {
            return { masterSentence: 'No associated active symptoms' };
        }
        const activeSymptoms = defect.symptoms.filter((symptom) => symptom.active);

        const { symptomToCount, entityToSymptomsRecords } = this.createLookupMaps(activeSymptoms);

        if (entityToSymptomsRecords.has('Service')) {
            const serviceSymptoms = entityToSymptomsRecords.get('Service');
            return this.createServiceSymptomDescription(serviceSymptoms, symptomToCount, activeSymptoms);
        }

        // None of the symptoms are active on services
        return this.createNonServiceSymptomDescription(symptomToCount, activeSymptoms);
    }
}