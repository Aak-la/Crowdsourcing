import request from "./request";

export async function getTheChartData() {
    return await request.get("/api/chart");
}