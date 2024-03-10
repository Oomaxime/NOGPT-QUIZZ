import {createTheme} from 'thememirror';
import {tags as t} from '@lezer/highlight';

const truthGame = createTheme({
	variant: 'dark',
	settings: {
		background: '#0E0E0E',
		foreground: '#ffffff',
		caret: '#ceba72',
		lineHighlight: 'rgba(24,24,24,0.3)',
		selection: '#ffffff',
		gutterBackground: '#242424',
		gutterForeground: '#B0B0B0',
	},
	styles: [
		{
			tag: t.comment,
			color: '#787878',
		},
		{
			tag: t.variableName,
			color: '#ceba72',
		},
		{
			tag: [t.string, t.special(t.brace)],
			color: '#ffffff',
		},
		{
			tag: t.number,
			color: '#B74F4E',
		},
		{
			tag: t.bool,
			color: '#B74F4E',
		},
		{
			tag: t.null,
			color: '#B74F4E',
		},
		{
			tag: t.keyword,
			color: '#ffffff',
		},
		{
			tag: t.operator,
			color: '#ffffff',
		},
		{
			tag: t.className,
			color: '#B74F4E',
		},
		{
			tag: t.definition(t.typeName),
			color: '#ffffff',
		},
		{
			tag: t.typeName,
			color: '#ceba72',
		},
		{
			tag: t.angleBracket,
			color: '#ceba72',
		},
		{
			tag: t.tagName,
			color: '#ceba72',
		},
		{
			tag: t.attributeName,
			color: '#ceba72',
		},
	],
});

export default truthGame;