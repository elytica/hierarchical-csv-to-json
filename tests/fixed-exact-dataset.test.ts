import { HCSVtoJSON } from '../src/index';
import { describe, expect, test } from '@jest/globals';

describe('Fixed Parser with Exact Dataset', () => {
    test('now correctly parses the exact dataset that was previously broken', () => {
        const csv = `1,Tasks
2,ID,Name,Description,Start,Finish,Outline Level,Is Summary,"SW_SplitsetsCap/m","SW_SplitsetsCapAdv","SW_SplitsetsDes/m","SW_SplitsetsDesAdv","Acc development Mesh","Access development Splitsets","Additional Intersection Support Factor","AN45 L","AN65 L","Anchors 4.5 METERS_Current","Anchors 4.5 METERS_MAD","Anchors 4.5 No of Intersections","Anchors 6.5 Meters  Brow","Attributed square metres","AU","AU_LDC","AU_LDC Bin","AU_LDC Bin1","AU_LDC Bin11","AU_LDC Bin111","AU_LDC Bin1111","AU_LDC_DILUTED","AU_LDC_DILUTED_EXTRACTED","AU_LDC_DILUTION","AU_LDC_LOSSES","AU_LDC_Recovered","BACKFILL_VOLUME","Bench Area","Bench Height","BKL:Splitsets_Adv","Cap:Vulcan/m","Cap:Vulcan_Adv","CHARGE_AU_LDC","CHARGE_KG","CHARGE_TONNES","Density","Des:Splitset/m","Des:Splitsets_Adv","Design Meters","Dest:DVulcan_Adv","Dest:Splitsets_Adv","Dest:Vulcan/m","Destress Mesh","DESTRESS_METRES","Detress Splitsets","Dev:Splitset/m","Dev:Splitsets_Adv","Dev:Total_Adv","Dft:Splitset/m","Dft:Splitsets_Adv","DIL_GRADE","DILUTION","End Meters","Excavated square metres","EXPLOSIVES_kg","Inters:4.5m_Adv1","Intersections","Kg","KG_DILUTED","KG_DILUTED_EXTRACTED","KG_DILUTION","KG_LOSSES","KG_Recovered","Kilograms","LOAD_AU_LDC","LOAD_KG","LOAD_TONNES","Longterm development mesh","Longterm development Splitsets","Longterm Development Vulcans","LOSSES","LSW","LTC","MAD_Anchors/m","MAD_METRES_4.5m","Material","Mesh/m","Meters","MLB","No AN45 Int","No AN65 Int","No_BROW_Anchors","No_Face_Bolts","No_Inter_Straps","No_Inters_Anchors_4.5m","No_MAD_Achors","No_Mesh","No_Mesh_Dev","No_Splitsets","No_Vulcans","No_WPlates","PARAMETRE_DEST","PARAMETRE_DEV","PARAMETRE_MAD","PERIOD","PERIOD_MNTH","PERIOD_YEAR","Recovery Factor","REEF","SHOTCRETE MAD Volume","SHOTCRETE SAD Volume","SHOTCRETE SD Volume","SHOTCRETE VOLUME","Shotcrete_E01_METRES","Shotcrete_E01_VOLUME","Shotcrete_MAD_METRES","Shotcrete_MAD_VOLME","SHOTCRETE_METERS","Shotcrete_TOTAL_VOLME","Slot_Metres","Splitsets Dev Total m","Splitsets Total m","Start Meters","Stope_Metres","Support Wastage Factor","SUPPORT_ METERS","Tonnes","Tonnes Bin","Tonnes Bin1","Tonnes Bin11","Tonnes Bin111","Tonnes Bin1111","TONNES_DILUTED","TONNES_DILUTED_EXTRACTED","TONNES_DILUTION","TONNES_LOSSES","Total:Vulcan_Adv","TOTAL_4.5m_Anchors","TOTAL_6.5m_Anchors","TOTAL_DRILL_METRES","TOTAL_METRES_4.5m","Total_Shotcrete_Meters","Total_Shotcrete_Vol","VOID GENERATED","Void Volume","Volume","Volume Bin","Volume Bin1","Volume Bin11","Volume Bin111","Volume Bin1111","VULCANS No of","ZONE","ADVANCE","TONS","AREA","STARTMETERS","ENDMETERS","ORDER","WALLWIDTH","TRUEADVANCE","CONF","AREA Code","BACKLOG BACKFILL","BOX","CUT","DIRECTION","END_ID","END_NAME","END_TYPE","EQ","LEVEL","Metres","MINE_AREA","ON-OFF_ECONOMICS","ON-OFF_FIELD","ON-OFF_RESERVES","PLAN","PLAN_PERIOD","PROFILE AREA","PROJECT","REQ_FILL","RES","SEQUENCE","STATE","TYPE_ID","Activity Type","Activity Class","Task Origin","RESOURCE","SECTION","*SelectedPath","BACKFILL_SEG","DEV_STO","DIS Activity ID","DIS Activity Number","DIS Activity Type","DIS Merge ID","DIS Parent GUID","DIS Parent ID","Interrogation Date","Interrogation Model Name","INTERSECTION SUPPORT","LOAD_SEG","Material Definition","MEASURED","MP Bench Order","MP Direction Sequence","MP Mining Area Number","MP Resource Name","ON-OFF_STRAT","PLAN_PER","REG_FILL","SEGMENT","Segment Length","STRAT","ActivityFilter","ActivityIdentifier","ActualStartSetBy","Azimuth","BlendDate","Blending Physical Resource","BlendingCanAlterDuration","BlockingDistance","BrokenParent","CalcRate","ChangedByPE","Constraint Before Delay","ConstraintBeforeDelay","ConstraintDateBeforeDelay","CreatedByBlending","CreatedOn","Deadline","Delay Push","Destination","DurationUnit","DynamicPriority","FileName","FromAssignedResourceId","Gradient","HasBeenBlocked","HyperlinkAddress","HyperlinkSubAddress","IncrementalActuals","InterrogationHistoryIndex","IsADeadHead","IsAStockpile","IsBlocking","IsDerivedTask","IsExternalTask","IsGenerated","IsHighGrade","IsLockBreaker","IsMilestone","IsParent","IsResourceDelayTask","IsSlaveTask","IsStartingBlock","LateLevelDate","LevelFromDate","LevelingMaximumDuration","LHSDate","Manual Finish","Manual Start","MasterSortId","MaxX","MaxY","MaxZ","MinRate","MinX","MinY","MinZ","Mirror Child","Mirror Parent","MultiPassID","Old Task Type","OptimizationDate","OptimizationFinishDate","OriginalCalendar","OriginalDrivingProperty","ParentActivityIdentifier","PhysicalResourceId","PhysicalResourceUnits","ProximityDeratingFactor","RateModifierName","RateModifierValueV4.0","SelectedPredecessorLayerName","ShortTermDate","SlaveActualDrivingQuantity","SlaveDrivingProperty","SlaveDrivingQuantity","SotFinishDate","SourceCycleTemplatePid","SourceTemplate","SourceTemplatePid","TaskMode","TaskStyle","UpdatedTime","VaryingRate","Warning","X","Y","Z","Work Package","Workplace Name","XYZ","TEXT","StartPoint","EndPoint","AdvanceAbbr","DurationAbbr","FloorAreaAbbr","VolumeAbbr","LevelNumber","LocationID","LocationName","RateAbbr","ActivityCode","FXS_Name","PL_Phase",Task Type,Rate,Duration,Constraint,Constraint Date,Actual Start,Actual Finish,% Complete,Delay Date,Priority,Level Constraint Date,Calendar,Dependency Method,Resource Sharing,Use Calendar,Level Task,Leveling Can Split,Haulage Destination,Road Network Node,Qty per cycle,Minimum Section Duration,Associated Stockpile,Parent Destination,Haulage Destination (Generic),Is External,Minimum Rate,Maximum Rate,Guid,Parent ID,Generated From Work Package,Generated From Template Task,Work Package cycle Index, Work Package Total Cycles, Work Package Cycle Quantity
3,"1","Planning \\Import Tool_Graphic Task__0","",2025-08-01 00:00,2025-08-01 00:00,0,0,6,0,6,0,0,0,1.02,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3.2E+21,3.2E+21,3.2E+21,3.2E+21,3.2E+21,0,0,0,0,4.4,0,0,0,0,0,15.2,0,0,0,0,9.9,0,0,0,11,0,0,12.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3.2E+21,0,0,0,0,0,0,0,0,3.3,0,0,22,0,0,0,0,0,13.2,0,0,0,0,0,0,0,0,11,16,17,0,0,0,0.965,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1.1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.161256722321923,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"NEW","YES","100 1BW BOX1","CUT04","E","D01_","NA","Backfill_Deplete","R3.1","095","0","CUR","1.0","1","1","M","0001/01/01 00:00:00","27.5","ALL","1","C3_D1","01","NA","D01","None","None","Deswik","C3_D1","1.00","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","0","0","0","","Placeholder - Do not delete","0,0,0","","7784.44720551724,-22979.6931869792,-915.49472845187","7784.44720551724,-22979.6931869792,-915.49472845187","","","","","0","","","m/d","","","",Fixed Rate,5m/d,0d,As Soon As Possible,,2025-08-01 00:00,2025-08-01 00:00,100,,0,,"Mining",Latest,Combined,Task,1,0,"","",0,0mi,,,,,0m/d,0m/d,46c68284-8d31-41f9-8d4b-519b9d086ca1,,0,0,-1,0,0`;

        const result = HCSVtoJSON(csv);
        
        // With the fixed parser, this should now work correctly!
        expect(result).toHaveProperty('Tasks');
        expect(result.Tasks).toHaveLength(1);
        
        const task = result.Tasks[0];
        
        // Now these should work correctly
        expect(task.ID).toBe(1); // ✅ Should be 1, not "ID"
        expect(task.Name).toBe("Planning \\Import Tool_Graphic Task__0"); // ✅ Correct name
        expect(task.Description).toBe(""); // ✅ Empty description
        expect(task.Start).toBe("2025-08-01 00:00");
        expect(task.Finish).toBe("2025-08-01 00:00");
        expect(task["Outline Level"]).toBe(0);
        expect(task["Is Summary"]).toBe(0);
        
        // Scientific notation values
        expect(task["AU_LDC_DILUTED"]).toBe(3.2e+21);
        expect(task["AU_LDC_DILUTED_EXTRACTED"]).toBe(3.2e+21);
        
        // Other specific values
        expect(task["SW_SplitsetsCap/m"]).toBe(6);
        expect(task["Cap:Vulcan/m"]).toBe(4.4); // The 4.4 value is in this field
        expect(task["Recovery Factor"]).toBe(0.965);
        
        // Core fix validation: The coordinate values that were breaking the parser now work
        expect(task.StartPoint).toBe("7784.44720551724,-22979.6931869792,-915.49472845187");
        expect(task.EndPoint).toBe("7784.44720551724,-22979.6931869792,-915.49472845187");
        
        // Task type information
        expect(task["Task Type"]).toBe("Fixed Rate");
        expect(task.Rate).toBe("5m/d");
        expect(task.Duration).toBe("0d");
        expect(task.Constraint).toBe("As Soon As Possible");
        
        console.log('✅ SUCCESS: The exact dataset now parses correctly!');
        console.log('Task ID:', task.ID, '(type:', typeof task.ID, ')');
        console.log('Task Name:', task.Name);
        console.log('Total fields parsed:', Object.keys(task).length);
    });

    test('handles the second task from your dataset', () => {
        const csv = `1,Tasks
2,ID,Name,Description,Start,Finish
3,"01_095 01W BOX6_CUT01_N_ACC_DS6439_0_M_0001/01/01 12:00:00 AM_090 1AW_0_06_D01_NEW_2d18a84a","090 1AW CUT01  ACC  06N ","ACC",2025-09-01 00:00,2025-09-02 03:21`;

        const result = HCSVtoJSON(csv);
        
        expect(result.Tasks).toHaveLength(1);
        const task = result.Tasks[0];
        
        expect(task.ID).toBe("01_095 01W BOX6_CUT01_N_ACC_DS6439_0_M_0001/01/01 12:00:00 AM_090 1AW_0_06_D01_NEW_2d18a84a");
        expect(task.Name).toBe("090 1AW CUT01  ACC  06N");
        expect(task.Description).toBe("ACC");
        expect(task.Start).toBe("2025-09-01 00:00");
        expect(task.Finish).toBe("2025-09-02 03:21");
    });
});
