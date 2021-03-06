import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ActivityIndicator
} from 'react-native'

import colors from "../config/colors"

import Carousel, { Pagination } from 'react-native-snap-carousel';

const{width} = Dimensions.get("window")
const ITEM_WIDTH = Math.round(width * 0.6)

//const{height} = Dimensions.get("window")
//const ITEM_HEIGTH = Math.round(height)

export default function CarouselVertical(){

    const [infoRegiones, setInfoRegiones] = useState(null)
    const current_date = new Date()
    
    let dd = current_date.getDate()
    let mm = current_date.getMonth() + 1
    let yyyy = current_date.getFullYear()

    if(dd<10){
        dd = "0"+ dd
    }

    if(mm<10){
        mm = "0"+ mm
    }

    const formatted_date = yyyy + "-" + mm + "-" + dd

    const URL_HOST = `https://api.covid19tracking.narrativa.com/api/${formatted_date}/country/chile` 
    useEffect(() => {

        fetch(URL_HOST)
        .then((response) => response.json())
        .then((result) => {
            setInfoRegiones(result.dates[`${formatted_date}`].countries.Chile.regions)
        })
    },[])

    {if(infoRegiones){
        return(
            <View style = {{alignItems: "center"}}>
            <Carousel
                layout = {"default"}
                data = {infoRegiones}
                renderItem = {(item) => <RenderItem data = {item}/>}
                sliderWidth = {width}
                itemWidth = {ITEM_WIDTH}
                firstItem = {1}
            />
            {/*<Pagination
                activeDotIndex = {0}
                dotsLength = {13}
                activeDotIndex = {activeSlide}

            />*/}
            </View>
    
            )
    }else{
        return(
            <View style = {{flex: 1, paddingTop: 100}}>
                <ActivityIndicator
                    size = {100}
                    color = {colors.secundario}
                />
            </View>
        )
    }}

        
} 

function RenderItem(props){

    const{data} = props

    return(
        <View style = {styles.container}>
            <Text style = {styles.text}>
                {data.item.name_es}
            </Text>
            <View style = {{alignItems: "center"}}>
                <View style = {[styles.mini_card, {backgroundColor: colors.secundario}]}>
                    <Text style = {styles.textInfo}>
                        Casos Activos
                    </Text>
                    <View style = {{alignItems: "center"}}>
                        <Text style = {styles.textCifra}>
                            {data.item.today_open_cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </Text>
                    </View>
                </View>
                <View style = {[styles.mini_card, {backgroundColor: colors.azul_agua}]}>
                    <Text style = {styles.textInfo}>
                        Casos Totales
                    </Text>
                    <View style = {{alignItems: "center"}}>
                        <Text style = {styles.textCifra}>
                            {data.item.today_confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </Text>
                    </View>
                </View>
                <View style = {[styles.mini_card, {backgroundColor: colors.azul_claro}]}>
                    <Text style = {styles.textInfo}>
                            Muertos Totales
                        </Text>
                        <View style = {{alignItems: "center"}}>
                            <Text style = {styles.textCifra}>
                                {data.item.today_deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            </Text>
                        </View>
                </View>
            </View>
        </View>
    ) 
}

const styles = StyleSheet.create({
    container:{
        //elevation: 1,
        width: 250,
        height: 400, 
        borderRadius:20,
        borderColor: "#000",
        backgroundColor: "#F0F0F0",
        marginVertical: 10,
        padding: 15,
        //marginHorizontal:30,
    },
    text: {
        fontWeight: "bold",
        fontSize: 19,
        color: "black"
    },
    mini_card:{
        marginTop: 20,
        height: 90,
        width: 200,
        backgroundColor: "red",
        borderRadius: 20
    },
    textInfo:{
        fontWeight: "bold",
        fontSize: 15,
        margin: 7,
        color: colors.blanco
    },
    textCifra:{
        fontWeight: "bold",
        fontSize: 22,
        margin: 7,
        color: colors.blanco
    },
})