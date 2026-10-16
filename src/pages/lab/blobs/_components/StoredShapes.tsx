import { useState, useEffect } from 'react';
import ShapePreview from './ShapePreview.tsx';
import { generateBlob, type BlobProps } from '../../../../lib/blobs';

interface Props {
    lastMutationTime: number;
}

export default function StoredShapes(props: Props) {
    const { lastMutationTime } = props;
    const [keys, setKeys] = useState<string[]>([]);
    const [selectedKey, setSelectedKey] = useState<string>(null);
    const [previewData, setPreviewData] = useState<BlobProps>(null);

    const getBlobKeyList = async () => {
        console.log('Fetching keys...');
        const response = await fetch('/api/blobs', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (data.keys) {
            setKeys(data.keys);
        }
    };

    const getBlobByKey = async (key: string) => {
        setSelectedKey(key);
        const params = new URLSearchParams({ key });
        const response = await fetch(`/api/blob/?${params}`, {
            method: 'GET'
        });
        const data = await response.json();
        if (data.blob) {
            setPreviewData(generateBlob(data.blob));
        }
    };

    useEffect(() => {
        getBlobKeyList();
    }, [lastMutationTime]);

    return (
        <>
            <h2 className="mb-4 text-xl text-center sm:text-xl">Objects in Blob Store</h2>
            <div className="w-full overflow-hidden rounded-2xl border border-line bg-surface">
                <div className="p-4 text-center min-h-14">
                    {keys?.length ? (
                        <div className="space-y-1">
                            {keys.map((keyName) => (
                                <button
                                    key={keyName}
                                    className={
                                        'inline-flex items-center justify-center w-full px-4 py-1.5 rounded-lg font-mono text-sm text-muted cursor-pointer text-center transition hover:bg-white/5 hover:text-fg' +
                                        (selectedKey === keyName ? ' bg-accent/15 text-fg pointer-events-none' : '')
                                    }
                                    onClick={() => {
                                        getBlobByKey(keyName);
                                    }}
                                >
                                    {keyName}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <span className="text-sm text-muted">Please upload some shapes!</span>
                    )}
                </div>
                {previewData && (
                    <div className="p-4 border-t border-line aspect-square">
                        <ShapePreview {...previewData} />
                    </div>
                )}
            </div>
        </>
    );
}
