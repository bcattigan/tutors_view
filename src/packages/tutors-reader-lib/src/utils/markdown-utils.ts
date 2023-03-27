import showdown from 'showdown';
import showdownHighlight from 'showdown-highlight';
import { showdownCopyCode } from 'showdown-copy-code';
//import showdownKatex from "showdown-katex";
import { convertFileSrc } from '@tauri-apps/api/tauri';
import customClassExt from 'showdown-custom-class';
import path from 'path-browserify';

const converter = new showdown.Converter({
	tables: true,
	emoji: true,
	openLinksInNewWindow: true,
	extensions: [
		showdownHighlight,
		customClassExt,
		showdownCopyCode
		// showdownKatex({
		//   // maybe you want katex to throwOnError
		//   throwOnError: false,
		//   // disable displayMode
		//   displayMode: false,
		//   // change errorColor to blue
		//   errorColor: "red"
		// })
	]
});

function replaceAll(str: string, find: string, replace: string) {
	return str.replace(new RegExp(find, 'g'), replace);
}

export function convertMd(route: string, md: string, url: string): string {
	let html = '';
	if (md) {
		let filtered = replaceAll(md, './img\\/', `img/`);
		const imgMatch = filtered.matchAll(/!\[.*\]\((img\/.*)\)/g);
		const imgMatches = Array.from(imgMatch, (result) => result[1]);
		for (const imgName of imgMatches) {
			const assetPath = route.includes("note") ? route +'/' + imgName : path.dirname(route) + '/' + imgName;
			const assetUrl = convertFileSrc(assetPath);
			filtered = filtered.replace(imgName, assetUrl);
		}
		filtered = replaceAll(filtered, './archives\\/', `archives/`);
		const archivesMatch = filtered.matchAll(/\[.*\]\((archives\/.*)\)/g);
		const archivesMatches = Array.from(archivesMatch, (result) => result[1]);
		for (const archivesName of archivesMatches) {
			const assetPath = path.dirname(route) + '/' + archivesName;
			const assetUrl = convertFileSrc(assetPath);
			filtered = filtered.replace(archivesName, assetUrl);
		}
		filtered = replaceAll(filtered, './archive\\/', `archive/`);
		const archiveMatch = filtered.matchAll(/\[.*\]\((archive\/.*)\)/g);
		const archiveMatches = Array.from(archiveMatch, (result) => result[1]);
		for (const archiveName of archiveMatches) {
			const assetPath = path.dirname(route) + '/' + archiveName;
			const assetUrl = convertFileSrc(assetPath);
			filtered = filtered.replace(archiveName, assetUrl);
		}
		filtered = replaceAll(filtered, '\\]\\(\\#/', `](/lab/${url}/`);
		html = converter.makeHtml(filtered);
		const linkMatch = html.matchAll(/(<a\s*href=.*<\/a>)/g);
		const linkMatches = Array.from(linkMatch, (result) => result[1]);
		for (const link of linkMatches) {
			if (!link.includes('http') || link.includes('asset.localhost')) {
				const internalLink = link.replace('rel="noopener noreferrer" target="_blank"', '');
				html = html.replace(link, internalLink);
			}
		}
	}
	return html;
}
