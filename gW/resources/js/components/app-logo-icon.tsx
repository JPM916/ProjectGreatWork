import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            {...props}
            src="images/Logo.svg" 
            alt="App Logo"
            className="w-16 h-16"
        />
    );
}
