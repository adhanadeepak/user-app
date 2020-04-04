import React, {lazy, Suspense, useEffect, useState} from 'react';

const importView = type =>
    lazy(() =>
        import(`./${type}`).catch(() =>
            import(`./default`)
        )
    );

export default function Index(props) {
    const [view, setViews] = useState(null);

    useEffect(() => {
        function loadViews() {
            const Icon = async () => {
                const View = await importView(props.type);
                return <View key={`${props.type}${Math.random()}`} {...props}/>;
            };
            Icon().then((view)=> setViews(view))
        }

        loadViews();
    }, []);

    return (
        <Suspense fallback='Loading views...'>
            {view}
        </Suspense>
    );
}