export interface robloxPostsInterface {
    [key : string]:robloxPostInterface
}
export interface robloxPostInterface {
    roblox: true;
    author : string;
    title : string;
    description : string;
    address: string;
    platform : string;
    link : string;
    version: string;
}

export const CATEGORIES = ["All", "Public", "Private"]