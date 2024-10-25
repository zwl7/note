<template>
	<view class="loading_container" catchtouchmove="true">
		<view class="box1"></view>
		<!-- <view class="loading">Loading</view> -->
	</view>
</template>

<script>
export default {
	name: 'PageLoading',
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.loading_container {
	background-color: #f1f1f1;
	left: 0;
	overflow: hidden;
	position: fixed;
	right: 0;
	z-index: 200000;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
}

.loading {
	font-size: 28px;
	font-family: Arial, Helvetica, sans-serif;
	font-weight: bold;
	color: #ff3d00;
	letter-spacing: 2px;
	position: relative;
}

.loading::after {
	content: 'Loading';
	position: absolute;
	left: 0;
	top: 0;
	color: #fff;
	text-shadow: 0 0 2px #ff3d00, 0 0 1px #ff3d00, 0 0 1px #ff3d00;
	width: 100%;
	height: 100%;
	overflow: hidden;
	animation: loading-animation 6s linear infinite;
}

@keyframes loading-animation {
	0% {
		height: 100%;
	}
	100% {
		height: 0%;
	}
}

.box1 {
	display: block;
	position: relative;
	width: 6px;
	height: 10px;

	animation: rectangle infinite 1s ease-in-out -0.2s;

	background-color: #f0392c;
}

.box1:before,
.box1:after {
	position: absolute;
	width: 6px;
	height: 10px;
	content: '';
	background-color: #f0392c;
}

.box1:before {
	left: -14px;

	animation: rectangle infinite 1s ease-in-out -0.4s;
}

.box1:after {
	right: -14px;

	animation: rectangle infinite 1s ease-in-out;
}

@keyframes rectangle {
	0%,
	80%,
	100% {
		height: 20px;
		box-shadow: 0 0 #f0392c;
	}

	40% {
		height: 30px;
		box-shadow: 0 -20px #f0392c;
	}
}
</style>
