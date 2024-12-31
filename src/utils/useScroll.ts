import { useEffect, useState } from "react";

export const WorkPageId = "page-work";
export const AboutPageId = "page-about";
export const OtherProjectsId = "page-other-proj";

export enum Page {
    Work = "work",
    About = "about",
    OtherProjects = "otherproj"
}

const pageIds = [WorkPageId, AboutPageId, OtherProjectsId];

export const useScroll = () => {
    const [page, setPage] = useState<string>("");

    const scrollHandler = () => {
        const documentTop = document.scrollingElement?.scrollTop!;
        const pages = pageIds.map((page) => document.getElementById(page));
        let newPage = "";

        pages.forEach((page) => {
            if (page) {
                const top = page.offsetTop;
                const height = page.clientHeight;

                if (top < documentTop && top + height > documentTop) {
                    newPage = page.id;
                }
            }
        });

        setPage(newPage);
    };

    useEffect(() => {
        setTimeout(() => {
            scrollHandler();
        }, 100);

        document.addEventListener("scroll", scrollHandler);

        return () => {
            document.removeEventListener("scroll", () => {});
        };
    }, []);

    return page;
};
