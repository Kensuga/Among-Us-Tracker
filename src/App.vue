<template>
	<div class="page">
		<div class="bg">
			<div style="display: flex; justify-content: space-between">
				<div class="top-buttons">
					<font-awesome-icon
						:icon="['fa', 'minus-circle']"
						class="icons black reset-icon"
						@click="clear()"
					/>
				</div>
				<h1 class="title">
					Simple Among Us Tracker
				</h1>
				<div class="top-buttons">
					<font-awesome-icon
						:icon="['fa', 'sync-alt']"
						class="icons black reset-icon"
						@click="reset()"
					/>
				</div>
			</div>

			<div
				v-for="(category, index) in categories"
				:key="`d-${index}`"
				class="category"
				:style="category.players.length > 0 ? 'padding-bottom: 1%' : ''"
			>
				<div class="upper">
					<h1 style="margin-left: 5%;">{{ category.title }} :</h1>
					<font-awesome-icon
						v-if="category.title == 'Innocent'"
						:icon="['fa', 'plus']"
						class="icons black"
						@click="createPlayer()"
					/>
				</div>
				<draggable :list="category.players" group="people">
					<div
						v-for="(player, index) in category.players"
						:key="`p-${index}`"
						class="player"
						:style="
							`backgroundImage: linear-gradient(135deg, ${
								colors[player.color].primary
							} 0%, ${colors[player.color].dark} 100%`
						"
					>
						<img src="./assets/AmongUsEye.png" class="eye" />
						<span class="name" v-if="!player.edit">{{ player.name }}</span>
						<b-input class="input" v-if="player.edit" v-model="player.name" />
						<span
							v-if="player.edit"
							class="color"
							:style="`backgroundColor: ${colors[player.color]}`"
							@click="
								player.color !== 12 ? (player.color += 1) : (player.color = 0)
							"
							@contextmenu="
								player.color !== 0 ? (player.color -= 1) : (player.color = 12),
									handler($event)
							"
							>a</span
						>
						<font-awesome-icon
							v-if="!player.edit"
							:icon="['fa', 'edit']"
							class="icons"
							@click="player.edit = true"
						/>
						<font-awesome-icon
							v-if="player.edit"
							:icon="['fa', 'save']"
							class="icons"
							@click="player.edit = false"
						/>
						<font-awesome-icon
							v-if="player.edit"
							:icon="['fa', 'trash']"
							class="icons trash"
							@click="category.players.splice(index, 1)"
						/>
					</div>
				</draggable>
			</div>
			<div class="category">
				<div class="add-player" v-if="newPlayer.length > 0">Add New Player</div>
				<span
					draggable
					v-for="(newP, index) in newPlayer"
					:key="`np-${index}`"
					class="name-input name center"
					>Name: <b-input class="input-2" v-model="newP.name" />
					<span
						class="color"
						:style="`backgroundColor: ${colors[newP.color].primary}`"
						@click="newP.color !== 12 ? (newP.color += 1) : (newP.color = 0)"
						@contextmenu="
							newP.color !== 0 ? (newP.color -= 1) : (newP.color = 12),
								handler($event)
						"
						>a</span
					>
					<font-awesome-icon
						:icon="['fa', 'check']"
						class="icons black"
						style="margin-left: 5%"
						@click="submit(index)"
					/>
					<font-awesome-icon
						:icon="['fa', 'trash']"
						class="icons trash black"
						@click="newPlayer.splice(index, 1)"
					/>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
	components: {
		draggable,
	},

	data: () => ({
		categories: [
			{
				title: 'Innocent',
				players: [],
			},
			{
				title: 'Sus',
				players: [],
			},
			{
				title: 'Imposter',
				players: [],
			},
			{
				title: 'Dead',
				players: [],
			},
		],
		colors: [
			{
				primary: '#C51111',
				dark: '#7B0838',
			},
			{
				primary: '#132FD2',
				dark: '#09158E',
			},
			{
				primary: '#127F2D',
				dark: '#0A4D2D',
			},
			{
				primary: '#ED53B9',
				dark: '#AA2CAD',
			},
			{
				primary: '#EF7D0E',
				dark: '#B13E17',
			},
			{
				primary: '#F5F558',
				dark: '#C38821',
			},
			{
				primary: '#3F484E',
				dark: '#1E1F25',
			},
			{
				primary: '#D5E0EF',
				dark: '#8295BE',
			},
			{
				primary: '#6B30BC',
				dark: '#3C177C',
			},
			{
				primary: '#72491E',
				dark: '#5E2614',
			},
			{
				primary: '#39FEDB',
				dark: '#24A9BE',
			},
			{
				primary: '#50EF3A',
				dark: '#16A843',
			},
			{
				primary: '#918977',
				dark: '#51423E',
			},
		],
		newPlayer: [],
		currentColor: 0,
	}),

	methods: {
		handler: function(e) {
			e.preventDefault();
		},

		submit(index) {
			this.categories[0].players.push(this.newPlayer[index]);
			this.newPlayer.splice(index, 1);
		},

		createPlayer() {
			this.newPlayer.push({ name: '', color: 0, edit: false });
		},

		reset() {
			let temp = [];
			for (let i = 0; i < this.categories.length; i++) {
				for (let j = 0; j < this.categories[i].players.length; j++) {
					temp.push(this.categories[i].players[j]);
				}
				this.categories[i].players = [];
			}
			this.categories[0].players = temp;
		},

		clear() {
			for (let i = 0; i < this.categories.length; i++) {
				this.categories[i].players = [];
			}
		},
	},
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');

* {
	font-family: 'Patrick Hand', cursive;
	font-size: 2.5rem;
	-webkit-text-stroke: 1px black;
	user-select: none;
}

.bg {
	background-color: #a7c7e6;
	padding-bottom: 5%;
}

.page {
	background-color: #a7c7e6;
	height: 100vh;
	color: white;
}

.title {
	width: 50%;
	margin: 0 auto;
	margin-top: 1%;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 10px;
	box-shadow: 5px 5px rgba(0, 0, 0, 0.5);
	border-radius: 10px;
	text-align: center;
	padding-bottom: 1%;
	margin-bottom: 5%;
}

.category {
	color: white;
	margin: 0 auto;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 10px;
	box-shadow: 5px 5px rgba(0, 0, 0, 0.5);
	flex-direction: column;
	width: 90%;
	user-select: none;
	transition: 0.2s;
	margin-bottom: 3%;
}

.player {
	cursor: move;
	width: 80%;
	margin: 0 auto;
	border-radius: 10px;
	box-shadow: 5px 5px rgba(0, 0, 0, 0.5);
	display: flex;
	transition: 0.2s;
	user-select: none;
	margin-bottom: 1%;

	&:hover {
		width: 81%;
	}
}

.upper {
	display: flex;
}

.right {
	float: right;
}

.eye {
	width: 75px !important;
	margin-left: 5%;
	margin-right: 5%;
	align-self: center;
}

.icons {
	cursor: pointer;
	font-size: 3rem;
	color: white;
	margin-left: auto;
	margin-right: 5%;
	align-self: center;
	font-size: 2.5rem;
}

.black {
	color: black;
}

.add-player {
	text-align: center;
}

.trash {
	margin-left: 0px;
}

.center {
	margin: 0 auto;
}

.input {
	align-self: auto !important;
	background-color: transparent !important;
	border: 0px !important;
	color: white !important;
	margin-top: auto !important;
	margin-bottom: auto !important;
	font-size: inherit !important;
	width: 40% !important;
}

.input-2 {
	align-self: auto !important;
	border: 3px solid black !important;
	color: white !important;
	margin-top: auto !important;
	margin-bottom: auto !important;
	font-size: inherit !important;
	width: 40% !important;
	margin-left: 2%;
}

.name {
	margin-top: auto;
	margin-bottom: auto;
}

.name-input {
	display: flex;
	padding: 1%;
	margin-left: 5%;
}

.color {
	cursor: pointer;
	color: transparent;
	-webkit-text-stroke: 0px;
	width: 70px !important;
	height: 70px !important;
	margin-right: 0;
	margin-left: 5%;
	margin-top: auto;
	margin-bottom: auto;
	border: 5px solid black;
	border-radius: 15px;
	transition: 0.2s;
}

.top-buttons {
	margin: auto;
}

.reset-icon {
	background-color: white;
	width: 50px !important;
	height: 50px !important;
	border-radius: 1000px;
	padding: 3%;
	margin-left: 5%;
	box-shadow: 5px 5px rgba(0, 0, 0, 0.5);
}
</style>
