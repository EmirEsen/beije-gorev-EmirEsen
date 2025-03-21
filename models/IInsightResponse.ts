// Interface for a single insight entry
interface IInsight {
    _id: string;
    title: string;
    content: string;
}

// Interface for the collection of insights
interface IInsights {
    insights: IInsight[];
}

// Full response structure
export interface IInsightResponse {
    success: boolean;
    data: IInsights;
} 