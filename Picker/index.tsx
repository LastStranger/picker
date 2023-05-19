import React, {useEffect, useRef} from "react";
import {ScrollView, Text, View} from "react-native";
import styles from "./style";
import {Props} from "./interfaces";

const Index = (props: Props) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const canMomentum = useRef(false);
    const isFirstScroll = useRef(true);
    useEffect(() => {
        // 每次列表数据出现变化, 都要回到第一个, 比如滑动省后,城市列表会更新,这个时候城市列表要回到顶部
        scrollViewRef.current?.scrollTo({y: 0, animated: false});
    }, [props.data]);

    const handleScrollTo = (index: any) => {
        // 编辑的时候,请求到数据后,滑动到具体的位置, 仅进行第一次操作, 后面滑动操作都不会调用到下面的方法
        if (isFirstScroll.current) {
            console.log("scrollTo", index);
            setTimeout(() => {
                scrollViewRef.current?.scrollTo({y: index * 50, animated: false});
            }, 200);
            isFirstScroll.current = false;
        }
    };

    const handleScrollEnd = ({nativeEvent}: any) => {
        //  滑动停止后,将当前的item的id保存起来
        if (canMomentum.current) {
            console.log("scrollEnd结束", nativeEvent);
            let offset = nativeEvent.contentOffset.y;
            let index = Math.floor(offset / 50);
            console.log("index is", index);
            props.onValueChange(props.data[index].id);
        }
        canMomentum.current = false;
    };

    const onMomentumScrollBegin = () => {
        canMomentum.current = true;
    };

    return (
        <ScrollView
            style={styles.container}
            ref={scrollViewRef}
            decelerationRate="fast"
            snapToInterval={50} // 每次滑动最后的终点距离都是50的倍数, 这个是实现滑动效果的灵魂属性
            showsVerticalScrollIndicator={false} //不显示滚动条
            onMomentumScrollEnd={handleScrollEnd}
            onMomentumScrollBegin={onMomentumScrollBegin} // 处理Android的滑动问题,会多次调用scrollEnd,如果你没发现这个问题可以去掉这个监听方法
        >
            <View style={{height: 50}}/> // 因为要在中间,所以给前面两个弄两个空白的
            <View style={{height: 50}}/>
            {props.data.map((each, index) => (
                <Item
                    onScroll={handleScrollTo}
                    selectedValue={props.selectedValue}
                    key={each.name}
                    index={index}
                    lastIndex={props.data.length - 1}
                    label={each.name}
                    value={each.id}
                />
            ))}
            <View style={{height: 50}}/>
            <View style={{height: 50}}/>
        </ScrollView>
    );
};

const Item = (props: any) => {
    useEffect(() => {
        if (props.selectedValue === props.value) {
            props.onScroll(props.index);
        }
    }, [props.selectedValue]);

    return (
        <View
            style={[
                styles.item,
            ]}
        >
            <Text style={styles.value}>{props.label}</Text>
        </View>
    );
};

Index.Item = Item;

export default Index;
