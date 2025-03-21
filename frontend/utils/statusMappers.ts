import { COMPLETED, IN_PROGRESS, PENDING } from "@/constants";
import { Status } from "@/types/Task";

export const mapStatusToLabel: Record<Status, string> = {
    [PENDING]: "Pending",
    [IN_PROGRESS]: "In Progress",
    [COMPLETED]: "Completed",
}

export const mapStatusToColor: Record<Status, string> = {
    [PENDING]: "bg-yellow-500",
    [IN_PROGRESS]: "bg-blue-500",
    [COMPLETED]: "bg-green-500",
}