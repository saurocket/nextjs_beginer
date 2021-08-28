import  '../styles/main.css'
import NextNprogress from 'nextjs-progressbar';
export default function MyApp({Component,pageProps}) {
    return (
        <>
            <NextNprogress
                color="#FFF"
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
                showOnShallow={true}
            />
            <Component {...pageProps}/>

        </>
    )
}