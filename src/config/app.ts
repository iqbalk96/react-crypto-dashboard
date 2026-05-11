type AppConfigType = {
    name: string,
    github: {
        title: string,
        url: string
    },
    author: {
        name: string,
        url: string
    },
}

export const appConfig: AppConfigType = {
    name: import.meta.env.VITE_APP_NAME ?? "Sample App",
    github: {
        title: "Crypto Analysis",
        url: "https://github.com/hayyi2/react-shadcn-starter",
    },
    author: {
        name: "iqbalk96",
        url: "https://github.com/iqbalk96",
    }
}

export const baseUrl = import.meta.env.VITE_BASE_URL ?? ""
