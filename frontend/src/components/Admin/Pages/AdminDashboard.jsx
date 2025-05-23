import { ChartAreaInteractive } from "../../chart-area-interactive";
import { DataTable } from "../../data-table";
import { SectionCards } from "../../section-cards";
import data from "./data.json";

export default function AdminDashboard() {

    return (
        <>
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                    <ChartAreaInteractive />
                </div>
                <DataTable data={data} />
            </div>
        </>
    );
}
