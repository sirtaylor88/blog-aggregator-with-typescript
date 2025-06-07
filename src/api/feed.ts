import { XMLParser } from "fast-xml-parser";
import { title } from "process";

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

async function getXML(feedURL: string): Promise<string> {
    const response = await fetch(
        feedURL,
        {
            method: 'GET',
            headers: {
                'User-Agent': 'gator'
        }
    });

    if (response.status > 399) {
        console.log("Got unexpected error!");
        return '';
    }

    return response.text();
};

function hasAllKeys(obj: object, keys: string[]): boolean {
    return keys.every((key) => Object.hasOwn(obj, key));
}


export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
    const data = await getXML(feedURL);
    const parser = new XMLParser;
    const parsedXML = parser.parse(data);

    if (!parsedXML.rss.channel) {
        throw new Error('Missing feed RSS channel!');
    }

    const channel = parsedXML.rss.channel;
    const keys = ['title', 'link', 'description']
    if (!hasAllKeys(channel, keys)) {
        throw new Error('Missing feed RSS data!');
    }

    if (keys.some((key) => typeof channel[key] !== 'string')) {
        throw new Error('Invalid RSS data!');
    }

    const items = [];
    const elementKeys = ['title', 'link', 'description', 'pubDate']

    if (Array.isArray(channel.item)) {
        for (const el of channel.item) {
            if (
                !hasAllKeys(el, elementKeys) ||
                elementKeys.some((key) => typeof el[key] !== 'string')
            ) {
                continue;
            }
            items.push(
                {
                    title: el.title,
                    link: el.link,
                    description: el.description,
                    pubDate: el.pubDate
                }
            )
        }
    }

    return {
        channel: {
            title: parsedXML.rss.channel.title,
            link: parsedXML.rss.channel.link,
            description: parsedXML.rss.channel.description,
            item: items
        }
    };
}
