/// <reference types="react-scripts" />

interface CharacterInfo {
    id: number;
    code: string;
    style: string;
    category: number;
    free?: boolean;
    sky: string;
    jonly: boolean;
    gonly: boolean;
    from?: number[];
    first?: boolean;
    change: number[];
}

interface InfoProps {
    array: CharacterInfo[]
}

interface DownloadProps {
    text?: string;
    width?: number;
    height?: number;
    tag: string;
}

interface CharacterTableViewProps extends CharacterInfo {
    have: boolean;
}