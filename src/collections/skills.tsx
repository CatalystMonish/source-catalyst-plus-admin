import { buildCollection, buildProperty } from "firecms";

export type Skill = {
    skillName: string;
    skillDescription: string;
    skillCategory: 'Technical' | 'Non-Technical' | 'Soft Skills' | 'Management' | 'Other';
    skillImage: string;
}

export const skillsCollection = buildCollection<Skill>({
    name: "Skills",
    singularName: "Skill",
    path: "skills",
    icon: "Build",
    group: "Data",// You can choose an appropriate icon
    permissions: ({ authController, user }) => ({
        read: true,
        edit: true,
        create: true,
        delete: true
    }),
    properties: {
        skillName: {
            name: "Skill Name",
            dataType: "string",
            validation: { required: true },
        },
        skillDescription: {
            name: "Skill Description",
            dataType: "string",
            multiline: true,
            validation: { required: true },
        },
        skillCategory: {
            name: "Skill Category",
            dataType: "string",
            validation: { required: true },
            enumValues: {
                'Tech': 'Tech',
                'Non-Tech': 'Non-Tech',
                'Soft Skills': 'Soft Skills',
                'Management': 'Management',
                'Other': 'Other'
            }
        },
        skillImage: {
            name: "Skill Image",
            dataType: "string",
            validation: { required: false },
            storage: {
                storeUrl: true,
                storagePath: "skills/thumbnails",
                acceptedFiles: ["image/*"],

            }
        },
    }
});
