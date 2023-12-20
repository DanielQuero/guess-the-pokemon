import { Vue, Component, Prop, Watch, Ref } from 'vue-facing-decorator'

@Component({})
export default class LoadingOverlay extends Vue {
	@Prop({ default: false }) loading?: boolean
	@Ref() pokeballTopHalf!: HTMLElement
	@Ref() pokeballBottomHalf!: HTMLElement

	showLoading = true
	isOpenPokeballAnimation = true

	animationEndHandler() {
		if (this.isOpenPokeballAnimation === true) this.showLoading = false
	}

	openPokeballAnimation() {
		setTimeout(() => {
			this.isOpenPokeballAnimation = true
			this.pokeballTopHalf.classList.remove('close')
			this.pokeballBottomHalf.classList.remove('close')
			this.pokeballTopHalf.classList.add('open')
			this.pokeballBottomHalf.classList.add('open')
		}, 1000)
	}
	closePokeballAnimation() {
		this.isOpenPokeballAnimation = false
		this.pokeballTopHalf.classList.remove('open')
		this.pokeballBottomHalf.classList.remove('open')
		this.pokeballTopHalf.classList.add('close')
		this.pokeballBottomHalf.classList.add('close')
	}

	@Watch('loading')
	propertyWatcher(newValue: boolean, oldV: boolean) {
		this.showLoading = true

		if (newValue) {
			this.closePokeballAnimation()
		} else {
			this.openPokeballAnimation()
		}
	}
}
