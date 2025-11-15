/// <reference types="react" />

declare namespace JSX {
	interface IntrinsicElements {
		'el-dialog': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
		'el-dialog-backdrop': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
		'el-dialog-panel': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
	}
}

declare module 'react' {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface HTMLAttributes<T> {
		command?: string;
		commandfor?: string;
	}
}
