<template>
	<div class="navbar">
		<hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
		           @toggleClick="toggleSideBar"/>
		<!--<breadcrumb id="breadcrumb-container" class="breadcrumb-container" />-->
		<slot></slot>
	</div>
</template>

<script>
	import {mapGetters, mapState} from 'vuex'
	import Breadcrumb from '@/components/Breadcrumb'
	import Hamburger from '@/components/Hamburger'
	import ErrorLog from '@/components/ErrorLog'
	import Screenfull from '@/components/Screenfull'
	import SizeSelect from '@/components/SizeSelect'
	import LangSelect from '@/components/LangSelect'
	import Search from '@/components/HeaderSearch'

	export default {
		components: {
			Breadcrumb,
			Hamburger,
			ErrorLog,
			Screenfull,
			SizeSelect,
			LangSelect,
			Search,
		},
		computed: {
			...mapGetters([
				'sidebar',
				'avatar',
				'device'
			])
		},
		methods: {
			toggleSideBar() {
				this.$store.dispatch('app/toggleSideBar');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navbar {
		height: 42px;
		/*overflow: hidden;*/
		position: relative;
		background: #e3e9ee;
		box-shadow: 0 0 6px 0 rgba(204,204,204,.35);
		position: relative;
		.hamburger-container {
			line-height: 42px;
			padding: 0 8px !important;
			height: 40px;
			float: left;
			cursor: pointer;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 999;
			transition: background .3s;
			-webkit-tap-highlight-color: transparent;
			border-left: 1px solid #e1e1e1;
			border-right: 1px solid #e1e1e1;
      background: #ffffff;
			&:hover {
				background: rgba(0, 0, 0, .025)
			}
		}

		.breadcrumb-container {
			float: left;
		}

		.errLog-container {
			display: inline-block;
			vertical-align: top;
		}

		.right-menu {
			float: right;
			height: 100%;
			line-height: 50px;

			&:focus {
				outline: none;
			}

			.user-header{
				padding-left:20px;
			}

			.right-menu-item {
				display: inline-block;
				padding: 0 8px;
				height: 100%;
				font-size: 18px;
				color: #5a5e66;
				vertical-align: text-bottom;

				&.hover-effect {
					cursor: pointer;
					transition: background .3s;

					&:hover {
						background: rgba(0, 0, 0, .025)
					}
				}
			}

			.avatar-container {
				margin-right: 30px;

				.avatar-wrapper {
					margin-top: 5px;
					position: relative;

					.user-avatar {
						cursor: pointer;
						width: 40px;
						height: 40px;
						border-radius: 10px;
					}

					.el-icon-caret-bottom {
						cursor: pointer;
						position: absolute;
						right: -20px;
						top: 25px;
						font-size: 12px;
					}
				}
			}
		}
	}
</style>
