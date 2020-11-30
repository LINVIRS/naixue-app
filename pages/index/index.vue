<template>
	<view class="container">
		<view class="banner">
			<image src="https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg" class="bg"></image>
			<view class="intro">
				<view class="greet">您好，{{ isLogin ? userInfo.nickName : '游客' }}</view>
				<view class="note">一杯奶茶，一口软欧包，在奈雪遇见两种美好</view>
			</view>
		</view>

		<view class="content">
			<!-- 点餐入口 -->
			<view class="entrance">
				<view class="item" @tap="takein">
					<image src="../../static/images/index/zq.png" class="icon"></image>
					<text class="title">自取</text>
				</view>
				<view class="item" @tap="takeout">
					<image src="../../static/images/index/wm.png" class="icon"></image>
					<text class="title">外卖</text>
				</view>
			</view>
			<!-- 会员积分 -->
			<view class="info">
				<view class="integral-section">
					<view class="top">
						<text class="title">我的积分</text>
						<text class="value">{{ isLogin ? userInfo.pointNum : 0 }}</text>
					</view>
					<view class="bottom">
						进入积分商城兑换奈雪卷及周边好礼
						<view class="iconfont icon-arrow-right"></view>
					</view>
				</view>
				<view class="qrcode-section">
					<image src="/static/images/index/qrcode.png" mode=""></image>
					<text>会员码</text>
				</view>
			</view>

			<!-- 奈雪的茶商城 -->
			<view class="navigators">
				<view class="left">
					<view class="grid flex-column just-content-center">
						<view class="d-flex align-items-center">
							<image src="../../static/images/index/csc.png" class="mark-img"></image>
							<view class="font-size-sm text-color-base">奈雪的茶商城</view>
						</view>
						<view class="text-color-assist" style="margin-left: 40rpx; font-size: 20rpx;">优质茶礼盒，网红零食</view>
					</view>
					<view class="grid justify-content-end align-items-end"><image src="../../static/images/index/yzclh.png" class="yzclh-img" mode="heightFix"></image></view>
				</view>
				<view class="right">
					<view class="tea-activity">
						<image src="../../static/images/index/mcsb.png" class="mark-img"></image>
						<view>买茶送包</view>
						<view class="right-img"><image src="../../static/images/index/mcsb_bg.png" mode="widthFix"></image></view>
					</view>
					<view class="member-gifts">
						<image src="../../static/images/index/hyjb.png" class="mark-img"></image>
						<view>会员卷包</view>
						<view class="right-img"><image src="../../static/images/index/hyjb_bg.png" mode="widthFix"></image></view>
					</view>
				</view>
			</view>

			<!-- 会员新鲜事 -->
			<view class="member-news">
				<view class="header">
					<view class="title">会员新鲜事</view>
					<view class="iconfont icon-Rightbutton"></view>
				</view>
				<view class="list">
					<view class="item">
						<image src="https://img-shop.qmimg.cn/s23107/2020/04/27/0039bf41c9ebd50a2c.jpg"></image>
						<view class="title">"梅"你不行 ｜ 霸气杨梅清爽回归</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	computed: {
		...mapState(['isLogin', 'orderType', 'userInfo', 'choseStore'])
	},
	onLoad() {},
	methods: {
			//自取
				takein() {
					//如果没有选中门店, 就跳转到门店页面让用户选择, 注意判断条件写法（choseStore是个对象）
					if(JSON.stringify(this.chooseStore) === '{}') {
						uni.navigateTo({
							url: '../stores/stores'
						});
					}
					//提交订单类型为“自取”，跳转到点餐页面
					this.$store.commit('SET_ORDERTYPE', "takein");
					uni.switchTab({
						url: '../menu/menu'
					})
				},
				//外卖
				takeout() {
					///未登录跳转到登录页
					if(!this.isLogin) {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					} else {
						// 已登录
						uni.navigateTo({
							url: '/pages/address/address?is_choose=true'
						});
					}
				}
	}
};
</script>

<style lang="scss">
.banner {
	position: relative;
	height: 600rpx;
	width: 100%;

	// 背景图片
	.bg {
		height: 600rpx;
		width: 100%;
	}

	.intro {
		position: absolute;
		display: flex;
		flex-direction: column;
		color: #ffffff;
		top: calc(50rpx + var(--status-bar-height));
		left: 40rpx;

		.greet {
			font-size: $font-size-lg;
			margin-bottom: 10rpx;
		}

		.note {
			font-size: $font-size-sm;
		}
	}
}

// 内容区域
.content {
	padding: 0 30rpx;

	// 入口(自取&外卖)
	.entrance {
		position: relative;
		margin-top: -80rpx;
		margin-bottom: 30rpx;
		border-radius: 10rpx;
		background-color: #ffffff;
		box-shadow: $box-shadow;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 30rpx 0;

		.item {
			position: relative;
			display: flex;
			flex: 1;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			&:nth-child(1):after {
				content: '';
				position: absolute;
				width: 1rpx;
				background-color: $text-color-assist;
				right: 0;
				height: 100%;
				transform: scaleX(0.5) scaleY(0.8);
			}

			.icon {
				width: 84rpx;
				height: 84rpx;
				margin: 20rpx;
			}

			.title {
				font-size: 30rpx;
				font-weight: 600;
				color: $text-color-base;
			}
		}
	}

	// 我的积分
	.info {
		position: relative;
		margin-bottom: 30rpx;
		border-radius: 10rpx;
		background-color: #ffffff;
		box-shadow: $box-shadow;
		padding: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.integral-section {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.top {
				display: flex;
				align-items: center;

				.title {
					color: $text-color-base;
					font-size: $font-size-base;
					margin-right: 10rpx;
				}

				.value {
					font-size: 44rpx;
					font-weight: bold;
				}
			}

			.bottom {
				font-size: $font-size-sm;
				color: $text-color-assist;
				display: flex;
				align-items: center;
			}
		}

		// 会员码
		.qrcode-section {
			color: $color-primary;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-size-sm;

			image {
				width: 40rpx;
				height: 40rpx;
				margin-bottom: 10rpx;
			}
		}
	}

	// 商城、买茶送包、会员卷包区域
	.navigators {
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		background-color: #ffffff;
		box-shadow: $box-shadow;
		padding: 20rpx;
		display: flex;
		align-items: stretch;

		// 奈雪的茶商城
		.left {
			width: 340rpx;
			margin-right: 20rpx;
			display: flex;
			padding: 0 20rpx;
			flex-direction: column;
			font-size: $font-size-sm;
			color: $text-color-base;
			background-color: #f2f2e6;

			.grid {
				height: 50%;
				display: flex;
			}
		}

		// 上下结构的买茶送包，会员卷包
		.right {
			width: 290rpx;
			display: flex;
			flex-direction: column;

			// 买茶送包、会员卷包公共样式
			.tea-activity,
			.member-gifts {
				width: 100%;
				display: flex;
				padding: 20rpx;
				font-size: $font-size-sm;
				color: $text-color-base;
				align-items: center;
				position: relative;
			}

			// 买茶送包个性样式
			.tea-activity {
				background-color: #fdf3f2;
				margin-bottom: 20rpx;
			}

			// 会员卷包个性样式
			.member-gifts {
				background-color: #fcf6d4;
			}

			// 右侧图片样式
			.right-img {
				flex: 1;
				position: relative;
				margin-left: 20rpx;
				margin-right: -20rpx;
				margin-bottom: -20rpx;
				display: flex;
				align-items: flex-end;

				image {
					width: 100%;
				}
			}
		}

		.mark-img {
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
		}

		.yzclh-img {
			height: 122.96rpx;
			width: 214.86rpx;
		}
	}

	// 会员新鲜事区域
	.member-news {
		width: 100%;
		margin-bottom: 30rpx;

		.header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx 0;

			.title {
				font-size: 52rpx;
				color: $text-color-assist;
			}

			.iconfont {
				font-size: 52rpx;
				color: $text-color-assist;
			}
		}

		.list {
			width: 100%;
			display: flex;
			flex-direction: column;

			.item {
				width: 100%;
				height: 240rpx;
				position: relative;

				image {
					width: 100%;
					height: 100%;
					border-radius: 8rpx;
				}

				.title {
					position: relative;
					font-size: 32rpx;
					font-weight: 500;
					width: 100%;
					top: -70rpx;
					left: 16rpx;
					color: #ffffff;
				}
			}
		}
	}
}
</style>
