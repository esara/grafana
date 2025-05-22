describe('DefectsUtil', () => {
  // let mockDefect: ApiDefect;
  // beforeEach(() => {
  //   // GIVEN
  //   mockDefect = {
  //     id: 'defect_id',
  //     remediated: true,

  //     fromTime: TimeUtil.getStartTime(TimeOption.ONE_HOUR, TimeUtil.now()),
  //     toTime: '',
  //     name: 'Noisy neighbour',
  //     entity: {
  //       id: 'entity_id',
  //       name: 'entity_name',
  //       typeName: 'entity_type',
  //     },
  //   } as unknown as ApiDefect;
  // });

  // describe('isDetected', () => {
  //   it('should return false when status="remediated"', () => {
  //     // GIVEN
  //     const defect = {
  //       ...mockDefect,
  //       remediated: true,
  //     };

  //     // WHEN & THEN
  //     expect(DefectsUtil.isDetected(defect)).toEqual(false);
  //   });

  //   it('should return false when status="cleared"', () => {
  //     // GIVEN
  //     const defect = {
  //       ...mockDefect,
  //       remediated: false,
  //       toTime: TimeUtil.getStartTime(TimeOption.ONE_HOUR, TimeUtil.now()),
  //     };

  //     // WHEN & THEN
  //     expect(DefectsUtil.isDetected(defect)).toEqual(false);
  //   });

  //   it('should return true when status="detected"', () => {
  //     // GIVEN
  //     const defect = {
  //       ...mockDefect,
  //       remediated: false,
  //     };

  //     // WHEN & THEN
  //     expect(DefectsUtil.isDetected(defect)).toEqual(true);
  //   });

  //   it('should return false when status="inactive"', () => {
  //     // GIVEN
  //     const defect = {
  //       ...mockDefect,
  //       fromTime: '',
  //     };

  //     // WHEN & THEN
  //     expect(DefectsUtil.isDetected(defect)).toEqual(false);
  //   });
  // });

  // describe('toStatus', () => {
  //   it('should return status when remediated', () => {
  //     // GIVEN
  //     const defect = {
  //       ...mockDefect,
  //       remediated: true,
  //     };

  //     // WHEN
  //     const result = DefectsUtil.toStatus(defect);

  //     // THEN
  //     expect(result).toEqual('remediated');
  //   });

  //   it('should return status when cleared', () => {
  //     // GIVEN
  //     const defect = {
  //       ...mockDefect,
  //       remediated: false,
  //       toTime: TimeUtil.getStartTime(TimeOption.ONE_HOUR, TimeUtil.now()),
  //     };

  //     // WHEN
  //     const result = DefectsUtil.toStatus(defect);

  //     // THEN
  //     expect(result).toEqual('cleared');
  //   });

  //   it('should return status when detected', () => {
  //     // GIVEN
  //     const defect = {
  //       ...mockDefect,
  //       remediated: false,
  //     };

  //     // WHEN
  //     const result = DefectsUtil.toStatus(defect);

  //     // THEN
  //     expect(result).toEqual('detected');
  //   });

  //   it('should return status when inactive', () => {
  //     // GIVEN
  //     const defect = {
  //       ...mockDefect,
  //       fromTime: '',
  //     };

  //     // WHEN
  //     const result = DefectsUtil.toStatus(defect);

  //     // THEN
  //     expect(result).toEqual('inactive');
  //   });
  // });

  // describe('toStatusInfo', () => {
  //   it('should return status when remediated', () => {
  //     // GIVEN
  //     vi.spyOn(IntlUtil, 'translate');
  //     const defect = {
  //       ...mockDefect,
  //       remediated: true,
  //     };

  //     // WHEN
  //     const result = DefectsUtil.toStatusInfo(defect);

  //     // THEN
  //     expect(result).toEqual({
  //       className: 'cui--icon--normal',
  //       color: 'outline',
  //       iconName: 'CheckmarkFilled',
  //       nameTooltip: 'feature.defect.defectName.remediated.tooltip',
  //       severityTooltip: 'feature.defect.defectSeverity.remediated.unknown.tooltip',
  //       status: 'feature.defect.defectStatus.remediated.text',
  //     });
  //   });

  //   it('should return status when cleared', () => {
  //     // GIVEN
  //     vi.spyOn(IntlUtil, 'translate');
  //     const defect = {
  //       ...mockDefect,
  //       remediated: false,
  //       toTime: TimeUtil.getStartTime(TimeOption.ONE_HOUR, TimeUtil.now()),
  //     };

  //     // WHEN
  //     const result = DefectsUtil.toStatusInfo(defect);

  //     // THEN
  //     expect(result).toEqual({
  //       className: 'cui--icon--unknown',
  //       color: 'outline',
  //       iconName: 'CheckmarkFilled',
  //       nameTooltip: 'feature.defect.defectName.cleared.tooltip',
  //       severityTooltip: 'feature.defect.defectSeverity.cleared.unknown.tooltip',
  //       status: 'feature.defect.defectStatus.cleared.text',
  //     });
  //   });

  //   it('should return status when detected', () => {
  //     // GIVEN
  //     vi.spyOn(IntlUtil, 'translate');
  //     const defect = {
  //       ...mockDefect,
  //       remediated: false,
  //     };

  //     // WHEN
  //     const result = DefectsUtil.toStatusInfo(defect);

  //     // THEN
  //     expect(result).toEqual({
  //       className: 'cui--icon--unknown',
  //       color: 'outline',
  //       iconName: 'WarningHexFilled',
  //       nameTooltip: 'feature.defect.defectName.active.tooltip',
  //       severityTooltip: 'feature.defect.defectSeverity.active.unknown.tooltip',
  //       status: 'feature.defect.defectStatus.active.text',
  //     });
  //   });

  //   it('should return status when inactive', () => {
  //     // GIVEN
  //     vi.spyOn(IntlUtil, 'translate');
  //     const defect = {
  //       ...mockDefect,
  //       fromTime: '',
  //     };

  //     // WHEN
  //     const result = DefectsUtil.toStatusInfo(defect);

  //     // THEN
  //     expect(result).toEqual({
  //       className: 'cui--icon--unknown',
  //       color: 'outline',
  //       iconName: 'WarningHexFilled',
  //       nameTooltip: 'feature.defect.defectName.inactive.tooltip',
  //       severityTooltip: 'feature.defect.defectSeverity.inactive.unknown.tooltip',
  //       status: 'feature.defect.defectStatus.inactive.text',
  //     });
  //   });
  // });

  // describe('toTimeInfo', () => {
  //   it('should return status when remediated', () => {
  //     // GIVEN
  //     vi.spyOn(IntlUtil, 'translate');
  //     const defect = {
  //       ...mockDefect,
  //       remediated: true,
  //       toTime: TimeUtil.getStartTime(TimeOption.ONE_HOUR, TimeUtil.now()),
  //     };

  //     // WHEN
  //     DefectsUtil.toTimeInfo(defect);

  //     // THEN
  //     expect(IntlUtil.translate).toHaveBeenCalledWith('feature.defect.timeInfo.remediated.text', {
  //       timeString: '2 hours ago',
  //     });
  //   });

  //   it('should return status when not remediated', () => {
  //     // GIVEN
  //     vi.spyOn(IntlUtil, 'translate');
  //     const defect = {
  //       ...mockDefect,
  //       remediated: false,
  //     };

  //     // WHEN
  //     DefectsUtil.toTimeInfo(defect);

  //     // THEN
  //     expect(IntlUtil.translate).toHaveBeenCalledWith('feature.defect.timeInfo.detected.text', {
  //       timeString: '2 hours ago',
  //     });
  //   });

  //   it('should return status when remediated but has invalid toTime', () => {
  //     // GIVEN
  //     vi.spyOn(IntlUtil, 'translate');
  //     const defect = {
  //       ...mockDefect,
  //       remediated: true,
  //       toTime: undefined,
  //     };

  //     // WHEN
  //     DefectsUtil.toTimeInfo(defect);

  //     // THEN
  //     expect(IntlUtil.translate).toHaveBeenCalledWith('feature.defect.timeInfo.remediated.text', {
  //       timeString: 'now',
  //     });
  //   });

  //   it('should return status when not remediated but has invalid fromTime', () => {
  //     // GIVEN
  //     vi.spyOn(IntlUtil, 'translate');
  //     const defect = {
  //       ...mockDefect,
  //       remediated: false,
  //       fromTime: undefined,
  //     };

  //     // WHEN
  //     DefectsUtil.toTimeInfo(defect);

  //     // THEN
  //     expect(IntlUtil.translate).toHaveBeenCalledWith('feature.defect.timeInfo.inactive.text');
  //   });
  // });

  // describe('toTreeNodeId', () => {
  //   it('should return node id', () => {
  //     // WHEN & THEN
  //     expect(DefectsUtil.toTreeNodeId('testEntityType', 'testDefectName')).toEqual('testEntityType__testDefectName');
  //     // WHEN & THEN
  //     expect(DefectsUtil.toTreeNodeId('testEntityType')).toEqual('testEntityType');
  //     // WHEN & THEN
  //     expect(() => DefectsUtil.toTreeNodeId('')).toThrow('entityType is required!');
  //   });
  // });

  // describe('fromTreeNodeId', () => {
  //   it('should return entityType and defectName', () => {
  //     // WHEN & THEN
  //     expect(DefectsUtil.fromTreeNodeId('testEntityType__testDefectName')).toEqual({
  //       entityType: 'testEntityType',
  //       defectName: 'testDefectName',
  //     });
  //     // WHEN & THEN
  //     expect(DefectsUtil.fromTreeNodeId('testEntityType')).toEqual({
  //       entityType: 'testEntityType',
  //       defectName: undefined,
  //     });
  //   });
  // });

  // describe('toDefectImpactImpactSummary', () => {
  //   it('should return empty when impact is empty', () => {
  //     // WHEN & THEN
  //     expect(DefectsUtil.toDefectImpactImpactSummary(null)).toEqual([]);
  //   });

  //   it('should return slo summary when count > 0', () => {
  //     // GIVEN
  //     const impact = {
  //       id: 'impact_id',
  //       name: 'impact_name',
  //       entity: {
  //         id: 'entity_id',
  //         name: 'entity_name',
  //         typeName: 'entity_type',
  //       },
  //       sloList: [
  //         {
  //           id: 'slo_id',
  //           name: 'slo_name',
  //           entity: {
  //             id: 'entity_id',
  //             name: 'entity_name',
  //             typeName: 'entity_type',
  //           },
  //           relatedEntity: {
  //             id: 'entity_id',
  //             name: 'entity_name',
  //             typeName: 'entity_type',
  //           },
  //           state: 'VIOLATED',
  //         },
  //         {
  //           id: 'slo_id',
  //           name: 'slo_name',
  //           entity: {
  //             id: 'entity_id',
  //             name: 'entity_name',
  //             typeName: 'entity_type',
  //           },
  //           relatedEntity: {
  //             id: 'entity_id',
  //             name: 'entity_name',
  //             typeName: 'entity_type',
  //           },
  //           state: 'AT_RISK',
  //         },
  //       ],
  //     } as unknown as DefectImpactItem;

  //     // WHEN & THEN
  //     expect(DefectsUtil.toDefectImpactImpactSummary(impact)).toEqual([
  //       {
  //         category: 'feature.defect.impactSummary.category.slo',
  //         label: 'feature.defect.impactSummary.slo.VIOLATED.text',
  //         tagType: 'red',
  //       },
  //     ]);
  //   });
  // });

  // describe('toDefectImpactInfo', () => {
  //   it('should return empty when defect is empty', () => {
  //     // WHEN & THEN
  //     expect(DefectsUtil.toDefectImpactInfo(null)).toEqual([]);
  //   });

  //   it('should return defect impact info when count > 0', () => {
  //     // GIVEN
  //     const defect = {
  //       id: 'defect_id',
  //       name: 'defect_name',
  //       impacts: [
  //         {
  //           id: 'impact_id',
  //           name: 'impact_name',
  //           entity: {
  //             id: 'entity_id',
  //             name: 'entity_name',
  //             typeName: 'entity_type',
  //           },
  //           sloList: [
  //             {
  //               id: 'slo_id',
  //               name: 'slo_name',
  //               entity: {
  //                 id: 'entity_id',
  //                 name: 'entity_name',
  //                 typeName: 'entity_type',
  //               },
  //               relatedEntity: {
  //                 id: 'entity_id',
  //                 name: 'entity_name',
  //                 typeName: 'entity_type',
  //               },
  //               state: 'VIOLATED',
  //             },
  //             {
  //               id: 'slo_id',
  //               name: 'slo_name',
  //               entity: {
  //                 id: 'entity_id',
  //                 name: 'entity_name',
  //                 typeName: 'entity_type',
  //               },
  //               relatedEntity: {
  //                 id: 'entity_id',
  //                 name: 'entity_name',
  //                 typeName: 'entity_type',
  //               },
  //               state: 'AT_RISK',
  //             },
  //           ],
  //         },
  //       ],
  //       slos: [
  //         {
  //           id: 'slo_id',
  //           name: 'slo_name',
  //           entity: {
  //             id: 'entity_id',
  //             name: 'entity_name',
  //             typeName: 'entity_type',
  //           },
  //           relatedEntity: {
  //             id: 'entity_id',
  //             name: 'entity_name',
  //             typeName: 'entity_type',
  //           },
  //           state: 'VIOLATED',
  //         },
  //       ],
  //     } as unknown as ApiDefect;

  //     // WHEN & THEN
  //     expect(DefectsUtil.toDefectImpactInfo(defect)).toEqual([
  //       {
  //         label: 'feature.defect.impactInfo.impactService.text',
  //         tagType: 'high-contrast',
  //       },
  //       {
  //         label: 'feature.defect.impactInfo.impactSlo.VIOLATED.text',
  //         tagType: 'red',
  //       },
  //     ]);
  //   });
  // });

  // describe('toSortedDefects', () => {
  //   it('should return sorted defects', () => {
  //     // GIVEN
  //     const defects = [
  //       {
  //         id: 'defect_id',
  //         remediated: true,
  //         fromTime: TimeUtil.getStartTime(TimeOption.ONE_HOUR, TimeUtil.now()),
  //         toTime: '',
  //         name: 'Noisy neighbour',
  //         entity: {
  //           id: 'entity_id',
  //           name: 'entity_name',
  //           typeName: 'entity_type',
  //         },
  //       } as unknown as ApiDefect,
  //       {
  //         id: 'defect_id',
  //         remediated: false,
  //         fromTime: TimeUtil.getStartTime(TimeOption.ONE_HOUR, TimeUtil.now()),
  //         toTime: '',
  //         name: 'Noisy neighbour',
  //         entity: {
  //           id: 'entity_id',
  //           name: 'entity_name',
  //           typeName: 'entity_type',
  //         },
  //       } as unknown as ApiDefect,
  //     ];

  //     // WHEN
  //     const result = DefectsUtil.toSortedDefects(defects);

  //     // THEN
  //     expect(result).toEqual([
  //       {
  //         entity: {
  //           id: 'entity_id',
  //           name: 'entity_name',
  //           typeName: 'entity_type',
  //         },
  //         fromTime: expect.any(String),
  //         id: 'defect_id',
  //         name: 'Noisy neighbour',
  //         remediated: false,
  //         status: 'detected',
  //         toTime: '',
  //       },
  //       {
  //         entity: {
  //           id: 'entity_id',
  //           name: 'entity_name',
  //           typeName: 'entity_type',
  //         },
  //         fromTime: expect.any(String),
  //         id: 'defect_id',
  //         name: 'Noisy neighbour',
  //         remediated: true,
  //         status: 'remediated',
  //         toTime: '',
  //       },
  //     ]);
  //   });
  // });

  // describe('toDurationInfo', () => {
  //   it('should return empty duration info', () => {
  //     // GIVEN
  //     vi.spyOn(IntlUtil, 'translate');
  //     const defect = {
  //       id: 'defect_id',
  //       remediated: true,
  //       fromTime: '',
  //       toTime: '',
  //       name: 'Noisy neighbour',
  //       entity: {
  //         id: 'entity_id',
  //         name: 'entity_name',
  //         typeName: 'entity_type',
  //       },
  //     } as unknown as ApiDefect;

  //     // WHEN
  //     DefectsUtil.toDurationInfo(defect);

  //     // THEN
  //     expect(IntlUtil.translate).not.toBeCalled();
  //   });

  //   it('should return duration info', () => {
  //     // GIVEN
  //     vi.spyOn(IntlUtil, 'translate');
  //     const defect = {
  //       id: 'defect_id',
  //       remediated: true,
  //       fromTime: TimeUtil.getStartTime(TimeOption.TWO_HOUR, TimeUtil.fromISO('2021-09-01T00:00:00Z')),
  //       toTime: TimeUtil.getStartTime(TimeOption.ONE_HOUR, TimeUtil.fromISO('2021-09-01T00:00:00Z')),
  //       name: 'Noisy neighbour',
  //       entity: {
  //         id: 'entity_id',
  //         name: 'entity_name',
  //         typeName: 'entity_type',
  //       },
  //     } as unknown as ApiDefect;

  //     // WHEN
  //     DefectsUtil.toDurationInfo(defect);

  //     // THEN
  //     expect(IntlUtil.translate).toHaveBeenCalledWith('feature.defect.timeInfo.duration.text', {
  //       duration: '1 hour',
  //     });
  //   });
  // });

  // describe('toTimeAxisThresholds', () => {
  //   it('should return empty time axis thresholds', () => {
  //     // GIVEN
  //     const defect = {
  //       id: 'defect_id',
  //       remediated: true,
  //       fromTime: '',
  //       toTime: '',
  //       name: 'Noisy neighbour',
  //       entity: {
  //         id: 'entity_id',
  //         name: 'entity_name',
  //         typeName: 'entity_type',
  //       },
  //     } as unknown as ApiDefect;

  //     // WHEN
  //     const result = DefectsUtil.toTimeAxisThresholds(defect);

  //     // THEN
  //     expect(result).toEqual([
  //       {
  //         fillColor: 'var(--cds-support-error, #fa4d56)',
  //         label: 'feature.defect.timeInfo.fromTime.text',
  //         value: expect.any(Date),
  //       },
  //     ]);
  //   });

  //   it('should return time axis thresholds', () => {
  //     // GIVEN
  //     const defect = {
  //       id: 'defect_id',
  //       remediated: true,
  //       fromTime: TimeUtil.getStartTime(TimeOption.TWO_HOUR, TimeUtil.fromISO('2021-09-01T00:00:00Z')),
  //       toTime: TimeUtil.getStartTime(TimeOption.ONE_HOUR, TimeUtil.fromISO('2021-09-01T00:00:00Z')),
  //       name: 'Noisy neighbour',
  //       entity: {
  //         id: 'entity_id',
  //         name: 'entity_name',
  //         typeName: 'entity_type',
  //       },
  //     } as unknown as ApiDefect;

  //     // WHEN
  //     const result = DefectsUtil.toTimeAxisThresholds(defect);

  //     // THEN
  //     expect(result).toEqual([
  //       {
  //         fillColor: 'var(--cds-support-error, #fa4d56)',
  //         label: 'feature.defect.timeInfo.fromTime.text',
  //         value: expect.any(Date),
  //       },
  //       {
  //         fillColor: 'var(--cds-support-success, #24a148)',
  //         label: 'feature.defect.timeInfo.toTime.text',
  //         value: expect.any(Date),
  //       },
  //     ]);
  //   });
  // });
});
