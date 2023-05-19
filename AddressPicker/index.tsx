import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
// import httpClient from "../../../../../common/http/httpClient";
import { Props } from "./interfaces";
import Picker from "../Picker";

const Index = (props: Props) => {
    const [selectedProvince, setSelectedProvince] = useState<any>(null);
    const [selectedCity, setSelectedCity] = useState<any>(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [provinces, setProvinces] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);

    useEffect(() => {
        getAllList(props.address);
    }, [props.address]);

    const getAllList = async (params: any) => {
        const provincesList = await httpClient.post("获取省级列表接口", { parentId: -1 });
        setProvinces(provincesList);
        setSelectedProvince(params.provinceCode ?? provincesList[0].id);
        const cityList = await httpClient.post("根据省级id获取城市列表", {
            parentId: params.provinceCode ?? provincesList[0].id,
        });
        setCities(cityList);
        setSelectedCity(params.cityCode ?? cityList[0].id);
        const districtList = await httpClient.post("根据城市id获取地区列表", {
            parentId: params.cityCode ?? cityList[0].id,
        });
        setDistricts(districtList);
        setSelectedDistrict(params.districtCode ?? districtList[0].id);
    };

    const handleProvinceChange = async (val: string) => {
        // console.warn(val);
        // return;
        setSelectedProvince(val);
        setSelectedCity(null);
        setSelectedDistrict(null);
        const cityList = await ******// 获取城市列表,并更新城市列表;
        setSelectedCity(cityList[0].id);
        const districtList = await ******// 获取地区列表,并更新地区列表;
        setSelectedDistrict(districtList[0].id);
    };

    const handleCityChange = async (val: string) => {
        setSelectedCity(val);
        setSelectedDistrict(null);
        const districtList = await await ******// 获取地区列表,并更新地区列表;
        setSelectedDistrict(districtList[0].id);
    };

    const handleConfirm = () => {
        // 按接口要求传出去的字段data
        const data = {
            provinceName: provinces.find((each) => each.id === selectedProvince).name,
            provinceCode: selectedProvince,
            cityName: cities.find((each) => each.id === selectedCity).name,
            cityCode: selectedCity,
            districtName: districts.find((each) => each.id === selectedDistrict).name,
            districtCode: selectedDistrict,
        };
        console.log(data, "datadata");
        props.onAddress(data);
    };

    return (
        <View style={styles.container}>
            <View style={styles.pickerWrp}>
                // 上层蒙层效果,透传滑动事件
                <View style={styles.opacityWrp} pointerEvents="none" />
                <Picker data={provinces} selectedValue={selectedProvince} onValueChange={handleProvinceChange} />
                <Picker data={cities} selectedValue={selectedCity} onValueChange={handleCityChange} />
                <Picker
                    data={districts}
                    selectedValue={selectedDistrict}
                    onValueChange={(itemValue: any) => setSelectedDistrict(itemValue)}
                />
                // 下层蒙层效果,透传滑动事件
                <View style={styles.opacityWrpDown} pointerEvents="none" />
            </View>
            <View style={styles.sectionLine} />
            <View style={styles.footer}>
                <TouchableOpacity style={styles.btnWrp} onPress={handleConfirm}>
                    <Text style={styles.btnText}>确认</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Index;
