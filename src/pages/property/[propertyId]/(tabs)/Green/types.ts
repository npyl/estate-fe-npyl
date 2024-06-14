interface Money {
    currencyCode: string;
    units: string;
    nanos: number;
}

interface FinancialDetails {
    initialAcKwhPerYear: number;
    remainingLifetimeUtilityBill: Money;
    federalIncentive: Money;
    stateIncentive: Money;
    utilityIncentive: Money;
    lifetimeSrecTotal: Money;
    costOfElectricityWithoutSolar: Money;
    netMeteringAllowed: boolean;
    solarPercentage: number;
    percentageExportedToGrid: number;
}

interface SavingsOverTime {
    savingsYear1: Money;
    savingsYear20: Money;
    presentValueOfSavingsYear20: Money;
    savingsLifetime: Money;
    presentValueOfSavingsLifetime: Money;
    financiallyViable: boolean;
}

interface LeasingSavings {
    leasesAllowed: boolean;
    leasesSupported: boolean;
    annualLeasingCost: Money;
    savings: SavingsOverTime;
}

interface CashPurchaseSavings {
    outOfPocketCost: Money;
    upfrontCost: Money;
    rebateValue: Money;
    savings: SavingsOverTime;
    paybackYears: number;
}

interface FinancedPurchaseSavings {
    annualLoanPayment: Money;
    rebateValue: Money;
    loanInterestRate: number;
    savings: SavingsOverTime;
}

interface FinancialAnalysis {
    monthlyBill: Money;
    defaultBill: boolean;
    averageKwhPerMonth: number;
    financialDetails: FinancialDetails;
    leasingSavings: LeasingSavings;
    cashPurchaseSavings: CashPurchaseSavings;
    financedPurchaseSavings: FinancedPurchaseSavings;
    panelConfigIndex: number;
}

interface RoofSegmentSummary {
    panelsCount: number;
    yearlyEnergyDcKwh: number;
    pitchDegrees: number;
    azimuthDegrees: number;
    segmentIndex: number;
}

interface SolarPanelConfig {
    panelsCount: number;
    yearlyEnergyDcKwh: number;
    roofSegmentSummaries: RoofSegmentSummary[];
}

interface RoofStats {
    areaMeters2: number;
    sunshineQuantiles: number[];
    groundAreaMeters2: number;
}

interface RoofSegmentStats {
    stats: RoofStats;
    center: LatLng;
    boundingBox: LatLng;
    pitchDegrees: number;
    azimuthDegrees: number;
    planeHeightAtCenterMeters: number;
}

interface SolarPanel {
    center: LatLng;
    orientation:
        | "SOLAR_PANEL_ORIENTATION_UNSPECIFIED"
        | "LANDSCAPE"
        | "PORTRAIT";
    yearlyEnergyDcKwh: number;
    segmentIndex: number;
}

interface SolarPotential {
    maxArrayPanelsCount: number;
    panelCapacityWatts: number;
    panelHeightMeters: number;
    panelWidthMeters: number;
    panelLifetimeYears: number;
    maxArrayAreaMeters2: number;
    maxSunshineHoursPerYear: number;
    carbonOffsetFactorKgPerMwh: number;
    wholeRoofStats: RoofStats;
    buildingStats: RoofStats;
    roofSegmentStats: RoofSegmentStats[];
    solarPanels: SolarPanel[];
    solarPanelConfigs: SolarPanelConfig[];
    financialAnalyses: FinancialAnalysis[];
}

interface LatLng {
    latitude: number;
    longitude: number;
}
interface DateData {
    year: number;
    month: number;
    day: number;
}

export interface BuildingInsights {
    name: string;
    center: LatLng;
    boundingBox: {
        sw: LatLng;
        ne: LatLng;
    };
    imageryDate: DateData;
    imageryProcessedDate: DateData;
    postalCode: string;
    administrativeArea: string;
    statisticalArea: string;
    regionCode: string;
    solarPotential: SolarPotential;
    imageryQuality: "IMAGERY_QUALITY_UNSPECIFIED" | "HIGH" | "MEDIUM" | "LOW";
}

export interface MinorPanelInfo {
    panel: { percent: number; text: string };
    energy: {
        percent: number;
        text: string;
    };
}
