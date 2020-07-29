// @ts-nocheck

type Link = {
	url: string;
	svg: boolean;
	icon: string;
	title: string;
};

class Socials extends HTMLElement {
	private color: string = this.theme || '#000';
	private items: Link[] = __links__;

	private styleEl: HTMLStyleElement = document.createElement('style');
	private sprite: HTMLTemplateElement = document.createElement('template');
	private template: HTMLTemplateElement = document.createElement('template');

	constructor() {
		super();

		this.render();

		const shadowRoot = this.attachShadow({
			mode: 'closed'
		});

		this.styleEl.innerHTML = __style__;

		this.sprite.innerHTML = __sprite__;

		shadowRoot.appendChild(this.styleEl.cloneNode(true));
		shadowRoot.appendChild(this.sprite.content.cloneNode(true));
		shadowRoot.appendChild(this.template.content.cloneNode(true));
	}

	get theme(): string {
		return this.getAttribute('color') || '#000';
	}

	set theme(color: string) {
		this.setAttribute('color', color);
	}

	private render(): void {
		this.template.innerHTML = `<ul>${this.renderList()}</ul>`;
	}

	private renderList(): string {
		return this.items
			.map(
				(item: Link) => `<li>
					<a href="${item.url}" target="_blank" rel="noopener noreferrer" title="${item.title}">
						${this.renderIcon(item)}
					</a>
				</li>`
			)
			.join('\n');
	}

	private renderIcon(item: Link): string {
		return item.svg
			? `<svg class="svg-${item.icon}"><use xlink:href="#svg-${item.icon}"></use></svg>`
			: `<img src="${item.icon}" alt="" width="24" loading="lazy" />`;
	}
}

customElements.define('social-links', Socials);
