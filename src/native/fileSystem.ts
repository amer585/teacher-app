import { Platform } from 'react-native';
import * as ExpoFileSystem from 'expo-file-system';

// Interface for File System Operations
export interface FileSystem {
    write: (filename: string, content: string) => Promise<void>;
    read: (filename: string) => Promise<string>;
}

// Mobile Implementation (Expo)
const MobileFS: FileSystem = {
    write: async (filename: string, content: string) => {
        const uri = ExpoFileSystem.documentDirectory + filename;
        await ExpoFileSystem.writeAsStringAsync(uri, content);
    },
    read: async (filename: string) => {
        const uri = ExpoFileSystem.documentDirectory + filename;
        return await ExpoFileSystem.readAsStringAsync(uri);
    }
};

// Desktop Implementation (Tauri)
const DesktopFS: FileSystem = {
    write: async (filename: string, content: string) => {
        try {
            // Dynamically import to avoid issues in non-browser environments
            if (typeof window !== 'undefined' && '__TAURI__' in window) {
                const { writeFile, BaseDirectory } = await import('@tauri-apps/plugin-fs');
                const encoder = new TextEncoder();
                const data = encoder.encode(content);
                await writeFile(filename, data, { baseDir: BaseDirectory.AppLocalData });
            } else {
                console.warn('Tauri environment not detected.');
            }
        } catch (e) {
            console.error('Desktop Write Error:', e);
            throw e;
        }
    },
    read: async (filename: string) => {
        try {
            if (typeof window !== 'undefined' && '__TAURI__' in window) {
                const { readTextFile, BaseDirectory } = await import('@tauri-apps/plugin-fs');
                return await readTextFile(filename, { baseDir: BaseDirectory.AppLocalData });
            }
            return '';
        } catch (e) {
            console.error('Desktop Read Error:', e);
            throw e;
        }
    }
};

// Export the correct implementation
export const NativeFileSystem = Platform.OS === 'web' ? DesktopFS : MobileFS;
