export interface minecraftPostsInterface {
    [key : string]:minecraftPostInterface
}

export interface minecraftPostInterface {
    minecraft : boolean;
    author : string;
    title : string;
    description : string;
    address: string;
    platform : string;
    link : string;
    version: string;
    modded: boolean;
    
    public: boolean;
}

export function isMinecraftPostsInterface(obj: any): obj is minecraftPostsInterface {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (!isMinecraftPost(obj)) {
                return false;
            }
        }
    }

    return true;
}

export const isMinecraftPost = (post: any): post is minecraftPostsInterface => {
    if (typeof post !== 'object' || post === null) return false;
    const requiredProperties = ["minecraft"];
    const postValues = Object.values(post);
    if (postValues.length === 0) return false;
    if (typeof postValues[0] !== 'object' || postValues[0] === null) return false;
    return requiredProperties.every(prop => prop in (postValues[0] as object));
}

export const MAX_TITLE_LENGTH = 20
export const MAX_DESC_LENGTH = 100
export const MAX_IP_LENGTH = 10

export const PLATFORMS = ["Java", "Bedrock"]
export const VERSIONS = ["1.19.2", "1.20.1"]
export const SOFTWARES = ["Vanilla", "Spigot", "Forge"]

export const CATEGORIES = ["All", "Public", "Private"]