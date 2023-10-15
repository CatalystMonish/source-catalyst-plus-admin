import { buildCollection, buildProperty, EntityReference } from "firecms";

export type Project = {
    projectTitle: string;
    projectDescription: string;
    projectThumbnail: string;
    projectAuthor: string;
    projectRating: number;
    projectTime: number;
    projectPostedTime: number;
    projectDifficulty: string;
    projectCategory: string;
    skills: EntityReference[];
    projectType: string;
}

export type ProjectTask = {
    taskNumber: number;
    taskTitle: string;
    taskPreText?: string; // Optional
    taskPostText?: string; // Optional
    taskCode?: string;
    taskCodeLanguage?: string; // Added
    taskDocumentLink?: string;
    taskVideoLink?: string;
    taskImage?: string; // Added
}

export const projectTasksSubcollection = buildCollection<ProjectTask>({
    name: "Project Tasks",
    singularName: "Project Task",
    path: "tasks",
    properties: {
        taskNumber: {
            name: "Task Number",
            dataType: "number",
            validation: { required: true }
        },
        taskTitle: {
            name: "Task Title",
            dataType: "string",
            validation: { required: true }
        },
        taskPreText: {
            name: "Task Pre Text",
            dataType: "string",
            multiline: true
        },
        taskPostText: {
            name: "Task Post Text",
            dataType: "string",
            multiline: true
        },
        taskCode: {
            name: "Task Code",
            dataType: "string",
            multiline: true
        },
        taskCodeLanguage: {
            name: "Task Code Language",
            dataType: "string"
        },
        taskDocumentLink: {
            name: "Task Document Link",
            dataType: "string"
        },
        taskVideoLink: {
            name: "Task Video Link",
            dataType: "string"
        },
        taskImage: buildProperty({
            name: "Task Image",
            dataType: "string",
            storage: {
                storagePath: "tasks/images",
                acceptedFiles: ["image/*"]
            }
        })
    }
});

export const projectsCollection = buildCollection<Project>({
    name: "Projects",
    singularName: "Project",
    path: "projects",
    icon: "FolderOpen",
    group: "Projects",
    permissions: ({ authController, user }) => ({
        read: true,
        edit: true,
        create: true,
        delete: true
    }),
    properties: {
        projectTitle: {
            name: "Project Title",
            validation: { required: true },
            dataType: "string"
        },
        projectDescription: {
            name: "Project Description",
            validation: { required: true },
            dataType: "string",
            multiline: true
        },
        projectThumbnail: buildProperty({
            name: "Project Thumbnail",
            dataType: "string",
            storage: {
                storagePath: "projects/thumbnails",
                acceptedFiles: ["image/*"]
            }
        }),
        projectAuthor: {
            name: "Author",
            dataType: "string"
        },
        projectRating: {
            name: "Project Rating",
            dataType: "number"
        },
        projectTime: {
            name: "Project Time",
            dataType: "number"
        },
        projectPostedTime: {
            name: "Posted Time",
            dataType: "number"
        },
        projectDifficulty: {
            name: "Project Difficulty",
            dataType: "string",
            enumValues: {
                beginner: "Beginner",
                intermediate: "Intermediate",
                expert: "Expert"
            }
        },
        projectCategory: {
            name: "Project Category",
            dataType: "string"
        },
        skills: {
            name: "Skills",
            dataType: "array",
            of: {
                dataType: "reference",
                path: "skills"
            }
        },
        projectType: {
            name: "Project Type",
            dataType: "string",
            enumValues: {
                technical: "Technical",
                nontechnical: "Non-Technical"
            }
        }
    },
    subcollections: [
        projectTasksSubcollection
    ]
});
