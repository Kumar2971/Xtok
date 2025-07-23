// Customizable Area Start
import React from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  View,
  Platform,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import moment from "moment";
import * as Progress from "react-native-progress";
import { Dropdown } from "react-native-element-dropdown";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";
const { width, height } = Dimensions.get("window");
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;

import PerformanceTrackerController, {
  Props
} from "./PerformanceTrackerController";
import { backArrow, imgLeftArrow } from "../../contactus/src/assets";
import Scale from "../../../components/src/Scale";
import { LineChart } from "react-native-chart-kit";
import { FlatList } from "react-native-gesture-handler";
import { translate } from "../../../components/src/i18n/translate";
import { imgRightArrow } from "./assets";
import { arrowUp } from "../../comments/src/assets";



export default class PerformanceTracker extends PerformanceTrackerController {
  constructor(props: Props) {
    super(props);

    Dimensions.addEventListener("change", (e) => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width
      );
      this.forceUpdate();
    });
  }
  header = () => {
    const {langauge} = this.state;
    console.log("lnnn===>",langauge);

    return (
      <View style={[styles.headercontainer]}>
        <View style={[styles.headerLeftContainer]}>
          <TouchableOpacity
          testID="UserProfileBasicBlock"
            style={{ marginRight: Scale(5) }}
            onPress={() =>
              this.props.navigation.navigate("UserProfileBasicBlock")
            }
          >
            <Image source={langauge == "ar" ? imgRightArrow : imgLeftArrow} style={langauge == "ar" ? styles.backarrow_style : styles.backarrow_style_en} />
          </TouchableOpacity>
          <Text style={styles.titleTxt}>{translate('performance')}</Text>
        </View>
        <View style={[styles.headerRightContainer]}>
          {this.dateTypeDropDown()}

        </View>
      </View>
    );
  };

  dropDown = () => {
    const {langauge} = this.state;
    const renderLeftIcon=()=>{if(langauge==='ar'){return () => (
      <Image source={arrowUp} style={{width: Scale(12),height: Scale(12),resizeMode: "contain", marginLeft: 10}} />
    )}}
    const renderRightIcon=()=>{
      if(langauge==='ar')
      {return ()=>null}
    }
    const data = [
      { label: translate('followers'), value: "followers" },
      { label: translate('accounts_Reached'), value: "accounts_reached" },
      { label: translate('reached_audience'), value: "reached_audience" },
      { label: translate('impressions'), value: "impressions" },
      { label: translate('accounts_Engaged'), value: "accounts_engaged" },
      { label: translate('contents_shared'), value: "contents_shared" }
    ];
    const { isFocus, screenType } = this.state;

    return (
      <View style={styles.dropdownContainer}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          mode='default'
          containerStyle={Platform.OS==='android'&& { top:Scale(-44)}}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={450}
          labelField="label"
          renderRightIcon={renderRightIcon()}
          renderLeftIcon={renderLeftIcon()}
          itemTextStyle={styles.dropdownText}
          valueField="value"
          placeholder={!isFocus ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={screenType}
          onFocus={() => this.setState({ isFocus: true })}
          onBlur={() => this.setState({ isFocus: false })}
          onChange={(item: any) => {
            this.setState({ screenType: item.value });
            this.setState({ isFocus: false });
          }}
        />
      </View>
    );
  };

  dateTypeDropDown = () => {
    const {langauge} = this.state;
    const renderLeftIcon=()=>{if(langauge==='ar'){return () => (
      <Image source={arrowUp} style={{width: Scale(12),height: Scale(12),resizeMode: "contain", marginLeft: 10}} />
    )}}
    const renderRightIcon=()=>{
      if(langauge==='ar')
      {return ()=>null}
    }
    const data = [
      { label: translate('monthly'), value: "monthly" },
      { label: translate('yearly'), value: "yearly" },
      { label: translate('weekly'), value: "weekly" }
    ];
    const { isDateTypeFocus, dateType } = this.state;

    return (
      <View style={styles.dateDropdownContainer}>
        <Dropdown
          style={[
            styles.dateTypeDropdown,
            isDateTypeFocus && { borderColor: "blue" }
          ]}
          containerStyle={[Platform.OS==='android'&& { top:Scale(-48)},{}]}
          placeholderStyle={styles.headerText}

          selectedTextStyle={styles.dateHeaderText}
          iconStyle={styles.iconStyle}
          data={data}
          renderLeftIcon={renderLeftIcon()}
          maxHeight={170}
          renderRightIcon={renderRightIcon()}

          labelField="label"
          itemTextStyle={styles.dateDropdownText}
          valueField="value"
          placeholder={!isDateTypeFocus ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={dateType}
          onFocus={() => this.setState({ isDateTypeFocus: true })}
          onBlur={() => this.setState({ isDateTypeFocus: false })}
          onChange={(item: any) => {
            this.setState({ dateType: item.value });
            this.setState({ isDateTypeFocus: false });
          }}
        />
      </View>
    );
  };

  performanceTypeSelection = () => {
    switch (this.state.screenType) {
      case "followers":
        return this.followersDisplay();
      case "accounts_engaged":
        return this.accountsEngagedSelection();
      case "accounts_reached":
        return this.accountsReachedDisplay();
      case "contents_shared":
        return this.contentsSharedDisplaySelection();
      case "impressions":
        return this.impressionsReachedDisplay();
      case "reached_audience":
        return this.reachedAudienceDisplay();
      case "visitors":
        return this.visitorsDisplaySelection();

      default:
        return this.followersDisplay();
    }
  };
  chartContainer = (data:{labels:string[],datasets:{data:number[],color:any}[]},max:number,maxIndex:number,labelTexts:{
    start:{top:string,bottom:string},
    mid:{top:string,bottom:string},
    end:{top:string,bottom:string},
  }) => {
    const {langauge} = this.state;

    const getMaxIndex = () => {
      let arr: number[] = [];
      data.datasets[0].data.map((item, index) => {
        if (item !== max||item===0) {

          arr.push(index);
        }
      });
      return arr;
    };

    return (
      <View style={[styles.chartContainer,langauge === "ar" && {paddingLeft: Scale(45),paddingRight:0}]}>
        <LineChart
          data={data}
          width={width + 60}
          renderDotContent={({ x, y, index }) => {

            if (index ===  maxIndex) {
              return (
                <View
                  style={[{
                    height: 22,
                    width: 34,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 3,
                    backgroundColor: "#FFC827",
                    position: "absolute",
                    top: y - 36, // <--- relevant to height / width (
                  },langauge === "ar" ? { right: x - 5 } : { left: x - 20 }

                ]
                  }
                >
                  <Text style={{ fontSize: 12 }}>
                    {data.datasets[0].data[index]}
                  </Text>
                </View>
              );
            }
          }}
          height={Scale(160)}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          chartConfig={this.chartConfig}
          bezier
          withShadow
          hidePointsAtIndex={getMaxIndex()}
          style={{ paddingHorizontal: 0 }}
        />
        <View style={[styles.graphAxis,this.state.langauge==='ar'? {marginRight:Scale(40)} : {marginLeft:Scale(40)}]}>
          <View style={styles.axisTitle}>
            <Text style={styles.axisText}>{labelTexts.start.top}</Text>
            <Text style={styles.axisText}>{labelTexts.start.bottom}</Text>
          </View>
          <View style={styles.axisTitle}>
            <Text style={styles.axisText}>{this.state.dateType!=='weekly'&& labelTexts.mid.top}</Text>
            <Text style={styles.axisText}>{this.state.dateType!=='weekly'&&labelTexts.mid.bottom}</Text>
          </View>
          <View style={styles.axisTitle}>
            <Text style={styles.axisText}>{labelTexts.end.top}</Text>
            <Text style={styles.axisText}>{labelTexts.end.bottom}</Text>
          </View>
        </View>
      </View>
    );
  };
  bottomInfoContainer = ({
    title,
    data,
    subTitle,
    type,
    withoutInternalBorder,
    withTopBorder
  }: {
    title: string;
    data: { title: string; value: number }[];
    subTitle: string;
    type: "number" | "percentage";
    withoutInternalBorder?: boolean;
    withTopBorder?: boolean;
  }) => {
    const {langauge} =this.state
    const totalValue = data.reduce((accumulator, object) => {
      return accumulator + object.value;
    }, 0);


    if(totalValue==0){
      return (
        <View
        style={[
          styles.bottomInfoContainer,
          withTopBorder && {
            borderTopWidth: 0.3,
            paddingTop: Scale(15),

            borderColor: "#B4B4B4"
          }
        ]}
      >
        <View
          style={[
            styles.bottomInfoTitle,
            withoutInternalBorder && { borderBottomWidth: 0, paddingBottom: 0 }
          ]}
        >
          <Text style={[styles.bottomInfoTitleText,styles.leftAlign]}>{title}</Text>
        </View>
        <Text
          style={[
            styles.grayText,
            {
              marginTop: 20,
              marginBottom: 15
            },styles.leftAlign
          ]}
        >
          {subTitle}
        </Text>
        <Text style={styles.notEnoughData}>{translate("not_enough_data")}</Text>
      </View>
      )

    }
else {
  return (
    <View
      style={[
        styles.bottomInfoContainer,
        withTopBorder && {
          borderTopWidth: 0.3,
          paddingTop: Scale(15),

          borderColor: "#B4B4B4"
        }
      ]}
    >
      <View
        style={[
          styles.bottomInfoTitle,
          withoutInternalBorder && { borderBottomWidth: 0, paddingBottom: 0 }
        ]}
      >
        <Text style={[styles.bottomInfoTitleText,styles.leftAlign]}>{title}</Text>
      </View>
      <Text
        style={[
          styles.grayText,
          {
            marginTop: 20,
            marginBottom: 15
          },styles.leftAlign
        ]}
      >
        {subTitle}
      </Text>
      {data.map((item, index) => {
        return this.percentageContainer({
          tag:
            type === "percentage"
              ? (item.value * 100).toFixed(0) + " %"
              : item.value.toString(),
          progress:
            type === "percentage" ? item.value : item.value / totalValue,
          title: item.title
        });
      })}
    </View>
  );
}

  };

  followersDisplay = () => {
    const followersData = this.state.data.followers;
    const {langauge} = this.state;

    if (followersData) {
      const {
        age_above_35,
        age_below_18,
        age_between_19_24,
        age_between_25_34,
        followers_count,
        last_followers_data,
        data_count
      } = followersData;

      const createAgeRangeData=()=>{
        let labels:any[]=[]
        let data:[]=[]
        let labelTexts={
          start:{top:'',bottom:''},
          mid:{top:'',bottom:''},
          end:{top:'',bottom:''},
        }
        if(data_count&&data_count.length>0){
           if(this.state.dateType==="yearly"){
           data_count.map((item:any,index)=>{
             labels.push(item[0].split(',',2)[0] as never );

             data.push(item[1] as never)
             if(index===data_count.length-1){
                labelTexts.end={top:item[0].split(',',2)[0].trim(),bottom:item[0].split(',',2)[1] }
             }else if(index===0){
              labelTexts.start={top:item[0].split(',',2)[0].trim(),bottom:item[0].split(',',2)[1]}
             }else if(index===Math.round(data_count.length/2)){
              labelTexts.mid={top:item[0].split(',',2)[0].trim(),bottom:item[0].split(',',2)[1]}
             }

          })}
           else{
            data_count.map((item:any,index)=>{

              labels.push(moment(item[0],'YYYY-MM-DD').format('DD') as never );

              data.push(item[1] as never)
              if(index===data_count.length-1){
                 labelTexts.end={top:moment(item[0],'YYYY-MM-DD').format('MMM'),bottom:moment(item[0],'YYYY-MM-DD').format('DD') }
              }else if(index===0){
               labelTexts.start={top:moment(item[0],'YYYY-MM-DD').format('MMM'),bottom:moment(item[0],'YYYY-MM-DD').format('DD')}
              }else if(index===Math.round(data_count.length/2)){
               labelTexts.mid={top:moment(item[0],'YYYY-MM-DD').format('MMM'),bottom:moment(item[0],'YYYY-MM-DD').format('DD')}
              }

           })

        }}else{

        }

        return {
          labels: labels,
          datasets: [
            {
              data: langauge==='ar'?data.reverse(): data,

              color: (opacity = 1) => `rgba(250, 190, 14, ${opacity})`, // optional
              strokeWidth: 4 // optional
            }
          ],labelTexts
        }
      }
      let data=createAgeRangeData()
      const max = Math.max(...data.datasets[0].data);
      const maxIndex = data.datasets[0].data.indexOf(max as never);

      data={...data,labels:data.labels.map((item,index)=>{
        if(maxIndex===index){
         return ''
        }else return item
      }) }

      const ageRangeData = [
        { title: "0-18", value: age_below_18? +age_below_18.slice(0, -1) / 100 :0 },
        { title: "19-24", value: age_between_19_24?+age_between_19_24.slice(0, -1) / 100 : 0 },
        { title: "25-34", value: age_between_25_34?+age_between_25_34.slice(0, -1) / 100 : 0 },
        { title: "35+", value:age_above_35? +age_above_35.slice(0, -1) / 100 : 0 }
      ];
      return (
        <>
          {this.topInformationContainer({
            type: "followers",
            percentage: last_followers_data||0,
            quantity: followers_count
          })}
          {data_count&&data_count.length>0&& this.chartContainer(data,max,maxIndex,createAgeRangeData().labelTexts)}
          {this.bottomInfoContainer({
            title: translate('top_Age_Range'),
            data: ageRangeData,
            subTitle: translate('top_age_ranges_that_follow_your_account'),
            type: "percentage"
          })}
        </>
      );
    }
  };
  accountsReachedDisplay = () => {
    const accountReachedData = this.state.data.accounts_reached;
    if (accountReachedData) {
      const {
        account_reached_count,
        posts_count,
        live_count,
        challenge_count,
        unfollowers_account_count,
        total_account_count,
        followers_account_count
      } = accountReachedData;

      const ageRangeData = [
        { title: translate('posts'), value: posts_count || 0 },
        { title: translate('stories'), value: 0 },
        { title: translate('live'), value: live_count || 0 },
        { title: translate('challange'), value: challenge_count || 0 }
      ];
      return (
        <>
          {this.topInformationContainer({
            type: "accounts",
            percentage: account_reached_count || 0,
            quantity: total_account_count || 0
          })}
          <View
            style={[
              styles.textAndValueRow,
              {
                borderTopWidth: 0.3,

                borderColor: "#B4B4B4"
              }
            ]}
          >
            <Text style={styles.semiboldTitle}>{translate('followers_reached')}</Text>
            <Text style={styles.semiboldTitle}>{followers_account_count || 0}</Text>
          </View>
          <View style={[styles.textAndValueRow, { marginBottom: Scale(10) }]}>
            <Text style={styles.semiboldTitle}>{translate('non_followers_reached')}</Text>
            <Text style={styles.semiboldTitle}>
              {unfollowers_account_count || 0}
            </Text>
          </View>

          {this.bottomInfoContainer({
            title: translate('content_Reach'),
            data: ageRangeData,
            type: "number",
            subTitle:
              translate('these_insights_will_help_you')
          })}
        </>
      );
    }
  };
  accountsEngagedSelection = () => {
    const accountsEngagedData = this.state.data.accounts_engaged;


    if (accountsEngagedData) {
      const { likes_data, comments_data ,unfollowers_engaged_count,followers_engaged_count,total_engaged_count,account_engaged_count} = accountsEngagedData;


      const postLikesData =  likes_data&&likes_data.data&&likes_data.data.map((item, index) => {
      return {source: item?.attributes?.post_medias?.thumnails?.[0], views: item.attributes.post_comment_count, impressions: item.attributes.post_likes_count}

      });
      const postCommentsData =  comments_data&&comments_data.data&& comments_data?.data.map((item, index) => {
        return {source: item?.attributes?.post_medias?.thumnails?.[0], views: item.attributes.post_comment_count, impressions: item.attributes.post_likes_count}

        });

        console.log(postCommentsData,'postCommentsData')
        console.log(postLikesData,'postLikesData')

      return (
        <View style={styles.accountsEngagedContainer}>
          {this.topInformationContainer({
            type: "accounts_engaged",
            percentage: account_engaged_count? +account_engaged_count.slice(0,-1):0,
            quantity: total_engaged_count
          })}
          <View
            style={[
              styles.textAndValueRow,
              {
                borderTopWidth: 0.3,
                borderColor: "#B4B4B4"
              }
            ]}
          >
            <Text style={styles.semiboldTitle}>{translate('followers_engaged')}</Text>
            <Text style={styles.semiboldTitle}>{followers_engaged_count || 0}</Text>
          </View>
          <View
            style={[
              styles.textAndValueRow,
              { marginBottom: Scale(10) }
            ]}
          >
            <Text style={styles.semiboldTitle}>{translate('non_followers_engaged')}</Text>
            <Text style={styles.semiboldTitle}>{unfollowers_engaged_count || 0}</Text>
          </View>
          <View style={styles.postsContainer}>
            {postLikesData?.length > 0 && this.postBlocks({
              data: postLikesData,
              title: translate('top_Posts'),
              subTitle: translate('based_on_likes')
            })}
            {postCommentsData?.length > 0 && this.postBlocks({
              data: postCommentsData,
              title: translate('top_Posts'),
              subTitle: translate('based_on_comments')
            })}
          </View>
        </View>
      );
    }
  };
  reachedAudienceDisplay = () => {
    const reachedAudienceData = this.state.data.reached_audience;

    if (reachedAudienceData) {
      const { country_data, age_range } = reachedAudienceData;

      const ageRangeData = [
        {
          title: "0-18",
          value: age_range.age_below_18? +age_range.age_below_18.slice(0, -1) / 100 : 0
        },
        {
          title: "19-24",
          value: age_range.age_between_19_24?+age_range.age_between_19_24.slice(0, -1) / 100 : 0
        },
        {
          title: "25-34",
          value:age_range.age_between_25_34? +age_range.age_between_25_34.slice(0, -1) / 100 : 0
        },
        { title: "35+", value: age_range.age_above_35?+age_range.age_above_35.slice(0, -1) / 100 : 0 }
      ];
      const countryData = country_data&&country_data.country ? country_data.country.map((i) => {
        return { title: i[0], value: i[1] / 100 || 0 };
      }): []
      return (
        <>
          {this.bottomInfoContainer({
            title: translate('top_Countries'),
            data: countryData,
            type: "percentage",
            subTitle: translate('top_Countries_where_your_country_is_being_viewed'),
            withoutInternalBorder: true
          })}

          {this.bottomInfoContainer({
            title: translate('top_Age_Range'),
            data: ageRangeData,
            type: "percentage",
            subTitle: translate('top_age_ranges_that_follow_your_content'),
            withoutInternalBorder: true,
            withTopBorder: true
          })}
        </>
      );
    }
  };

  imageContainerWithInteractions = ({
    source,
    views,
    impressions,
    index,
    length,
    scrollable
  }: {
    source: string;
    views: number;
    impressions: number;
    index: number;
    length: number;
    scrollable: boolean;
  }) => {
    return (
      <View
        style={[
          styles.imageContainer,
          index !== length - 1 && { paddingRight: Scale(5) }
        ]}
      >
        <Image
          source={{
            uri: source
          }}
          style={{
            resizeMode: "cover",
            width: "100%",
            height: "100%",

            backgroundColor: "black" //to be removed later
          }}
        />
        <View style={styles.viewsInfo}>
          <Icon name="play" size={Scale(26)} color="#ffffff" />
          <Text style={styles.whiteText}>{views}</Text>
        </View>
        <Text
          style={[
            styles.bottomInfoTitleText,
            { alignSelf: "center", marginTop: Scale(10) }
          ]}
        >
          {impressions}
        </Text>
      </View>
    );
  };

  topPerformingContentContainer = (data:{source:string,views:number,impressions:number}[]) => {


    return (
      <View style={styles.topPerformingContainer}>
        <Text style={[styles.bottomInfoTitleText,this.state.langauge==='ar'&&{alignSelf:'flex-start'}]}>
          {translate('top_performing_Content')}
        </Text>
        <Text style={[styles.grayText, this.state.langauge==='ar'&&{alignSelf:'flex-start'},{ paddingTop: Scale(10) }]}>
          {translate('Top_performing_content_this_month')}
        </Text>
        <View style={styles.performingImageContainer}>
          {data.map((item, index) => {
            if(index<3){
            return this.imageContainerWithInteractions({
              ...item,
              index,
              length: data.length<3?data.length:3,
              scrollable: false
            });
          } } )  }
        </View>
        <Text
          style={[
            styles.grayText,
            { paddingTop: Scale(40), alignSelf: "center" }
          ]}
        >
       {translate('no_of_impressions')}
        </Text>
      </View>
    );
  };

  postBlocks = ({
    data,
    title,
    subTitle
  }: {
    data?: { source: string; views: number; impressions: number }[];
    title: string;
    subTitle: string;
  }) => {
    return (
      <View style={styles.postBlocksContainer}>
        <Text style={[styles.bottomInfoTitleText,this.state.langauge==='ar'&& {alignSelf:'flex-start'}]}>{title}</Text>
        <Text style={[styles.grayText,,this.state.langauge==='ar'&& {alignSelf:'flex-start'}, { paddingTop: Scale(10) }]}>
          {subTitle}
        </Text>
        <ScrollView
          horizontal
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
          style={[styles.performingImageContainer,styles.alignContents]}
        >
          {data&&data.map((item, index) => {
            return this.imageContainerWithInteractions({
              ...item,
              index,
              length: data.length,
              scrollable: true
            });
          })}
        </ScrollView>
      </View>
    );
  };
  contentsSharedBlocks = ({
    data,
    title,
    subTitle
  }: {
    data: { source: string; views: number; impressions: number }[];
    title: string;
    subTitle: string;
  }) => {

    return (
      <View style={[styles.contentsSharedMainContainer]}>

        <FlatList
          data={data}
          numColumns={3}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({
            item
          }: {
            item: { source: string; views: number; impressions: number };
          }) => (
            <View style={[styles.imageContainerFull]}>
              <Image
                source={{
                  uri: item.source
                }}
                style={{
                  resizeMode: "cover",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "black" //to be removed later
                }}
              />
              <View style={[styles.viewsInfo,this.state.langauge =='ar' && {
                left: Scale(10),
                bottom: Scale(10),
              }]}>
                <Icon name="play" size={Scale(29)} color="#fff" />
                <Text style={styles.whiteText}>{item.views}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  impressionsReachedDisplay = () => {

    const ImpressionsData = this.state.data.impressions?.data;
    const ImpressionsMeta=this.state.data.impressions?.meta;


    const getImpressionPercentage=()=>{
      if(ImpressionsMeta&&ImpressionsMeta.last_likes_data){
        return +ImpressionsMeta.last_likes_data.split("%")[0]
      }
      else return 0

    }

    if (ImpressionsData&&ImpressionsData.length>0) {

      const ImpressionsListData=ImpressionsData.map((item,index)=>{
       return  { source: item?.attributes?.post_medias?.thumnails?.[0], views: item.attributes.post_comment_count, impressions: item.attributes.post_likes_count }
      })
    return (
      <>
        {this.topInformationContainer({
          type: "impressions",
          percentage: getImpressionPercentage(),
          quantity: ImpressionsMeta?.like_count?ImpressionsMeta.like_count:0
        })}
        {this.topPerformingContentContainer(ImpressionsListData)}
      </>
    );}else{
      return this.notEnoughDataContainer()
    }
  };

  visitorList = () => {
    const visitorData = [
      {
        date: "1 March 2020",
        visitor: "192.2192",
        avg: "1288/h",
        graph: "minus"
      },
      {
        date: "1 March 2020",
        visitor: "192.2192",
        avg: "1288/h",
        graph: "minus"
      },
      {
        date: "1 March 2020",
        visitor: "192.2192",
        avg: "1288/h",
        graph: "plus"
      },
      {
        date: "1 March 2020",
        visitor: "192.2192",
        avg: "1288/h",
        graph: "minus"
      }
    ];
    return (
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 1.1 }]}>{translate('date')}</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>
            Profile Visitor
          </Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>{translate('avgHour')}</Text>
          <Text style={[styles.tableHeaderText, { flex: 0.6 }]}>{translate('graph')}</Text>
        </View>
        {visitorData.map((item, index) => {
          return (
            <View key={index.toString() + "ITEM"} style={styles.tableRow}>
              <Text style={{ width: (width - 30) * 0.26 }}>{item.date}</Text>
              <Text style={{ width: (width - 30) * 0.22 }}>{item.visitor}</Text>
              <Text style={{ width: (width - 30) * 0.16 }}>{item.avg}</Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",

                  paddingLeft: 15
                }}
              >
                <Image
                  source={
                    item.graph === "minus"
                      ? require("../assets/trending-down.png")
                      : require("../assets/trending-up.png")
                  }
                  style={{
                    width: 40,

                    height: 22,
                    resizeMode: "contain"
                  }}
                />
              </View>
            </View>
          );
        })}
      </View>
    );
  };
  notEnoughDataContainer = () => {

    return (
      <View style={styles.notEnoughDataContainer}>
        <View style={styles.rectanglesContainer}>
          <View style={styles.rectangle} />
          <View style={[styles.rectangle, { height: 120 }]} />
          <View style={[styles.rectangle, { height: 80 }]} />
        </View>
        <Text style={[styles.headerText,styles.bold]}>{translate('not_Enough_data')}</Text>
        <Text style={styles.standardText}>
          {translate('keep_using_the_app_to_create_more_statistics_or_try_changing_the_filters')}
        </Text>
      </View>
    );
  };

  visitorsDisplaySelection = () => {
    const visitorsData = this.state.data.visitors;

    if (visitorsData) {
      const {
      data_count,
      data_select,last_followers_data,visitors_count
      } = visitorsData;
      console.log(data_count,'YOYO')
      const createAgeRangeData=()=>{
        let labels:any[]=[]
        let data:[]=[]
        let labelTexts={
          start:{top:'',bottom:''},
          mid:{top:'',bottom:''},
          end:{top:'',bottom:''},
        }
        if(data_count.length>0){
           if(this.state.dateType==="yearly"){
           data_count.map((item:any,index)=>{
             labels.push(item[0].split(',',2)[0] as never );

             data.push(item[1] as never)
             if(index===data_count.length-1){
                labelTexts.end={top:item[0].split(',',2)[0].trim(),bottom:item[0].split(',',2)[1] }
             }else if(index===0){
              labelTexts.start={top:item[0].split(',',2)[0].trim(),bottom:item[0].split(',',2)[1]}
             }else if(index===Math.round(data_count.length/2)){
              labelTexts.mid={top:item[0].split(',',2)[0].trim(),bottom:item[0].split(',',2)[1]}
             }

          })}
           else{
            data_count.map((item:any,index)=>{

              labels.push(moment(item[0],'YYYY-MM-DD').format('DD') as never );

              data.push(item[1] as never)
              if(index===data_count.length-1){
                 labelTexts.end={top:moment(item[0],'YYYY-MM-DD').format('MMM'),bottom:moment(item[0],'YYYY-MM-DD').format('DD') }
              }else if(index===0){
               labelTexts.start={top:moment(item[0],'YYYY-MM-DD').format('MMM'),bottom:moment(item[0],'YYYY-MM-DD').format('DD')}
              }else if(index===Math.round(data_count.length/2)){
               labelTexts.mid={top:moment(item[0],'YYYY-MM-DD').format('MMM'),bottom:moment(item[0],'YYYY-MM-DD').format('DD')}
              }

           })

        }}else{

        }

        return {
          labels: labels,
          datasets: [
            {
              data:data,

              color: (opacity = 1) => `rgba(250, 190, 14, ${opacity})`, // optional
              strokeWidth: 4 // optional
            }
          ],labelTexts
        }
      }
      let data=createAgeRangeData()
      const max = Math.max(...data.datasets[0].data);
      const maxIndex = data.datasets[0].data.indexOf(max as never);
      data={...data,labels:data.labels.map((item,index)=>{
        if(maxIndex===index){
         return ''
        }else return item
      }) }

      return (
        <>
          {this.chartContainer(data,max,maxIndex,createAgeRangeData().labelTexts)}
          {this.visitorList()}
        </>
      )

      }else return this.notEnoughDataContainer();

  };
  contentsSharedDisplaySelection = () => {
    const sharedContentData = this.state.data.contents_shared;

    if (sharedContentData&&sharedContentData.length>0) {

      const sharedContentListData=sharedContentData.map((item,index)=>{
       return  { source: item?.attributes?.post_medias?.thumnails?.[0], views: item.attributes.post_comment_count, impressions: item.attributes.post_likes_count }
      })

    return (
      <View style={styles.contentsShared}>
        {this.contentsSharedBlocks({
          data: sharedContentListData,
          title: translate('top_Stories'),
          subTitle: translate('based_on_likes')
        })}
      </View>
    );}else return this.notEnoughDataContainer()
  };

  renderMainContainer = () => {
    return (
      <View
        style={[
          styles.performanceMainContainer,
          (this.state.screenType === "accounts_engaged" ||
            this.state.screenType === "contents_shared") && {
            paddingHorizontal: 0
          }
        ]}
      >
        {this.performanceTypeSelection()}
      </View>
    );
  };

  percentageContainer = ({
    progress,
    tag,
    title
  }: {
    progress: number;
    tag: string;
    title: string;
  }) => {
    return (
      <View style={styles.progressBar}>
        <View style={styles.progressBarTitle}>
          <Text style={styles.progressBarText}>{title}</Text>
          <Text style={styles.progressBarText}>{tag}</Text>
        </View>
        <Progress.Bar
          unfilledColor="#F3F3F3"
          borderWidth={0}
          height={Scale(10)}
          color="#FEC925"
          progress={+progress || 0}
          width={width - Scale(30)}
        />
      </View>
    );
  };

  topInformationContainer = ({
    quantity,
    type,
    percentage
  }: {
    quantity: number;
    type: "followers" | "accounts" | "impressions" | "accounts_engaged";
    percentage: number;
  }) => {
    const {langauge}=this.state

    return (
      <View
        style={[
          styles.topContainer,
          this.state.screenType === "accounts_engaged" && {
            paddingHorizontal: 15
          }
        ]}
      >
        <Text style={[styles.bigTitle, { color: "#FFC330" }]}>
          {quantity}
        </Text>
        <Text style={styles.grayText}>
          {type === "followers"
            ? translate('total_Followers')
            : type === "accounts"
            ? translate('account_Reached_This_Month')
            : type === "accounts_engaged"
            ? translate('accounts_engaged_this_month')
            :translate('impresions_this_month')}
          {(type === "impressions" || type === "accounts_engaged") &&
          percentage >= 0 ? (
            <Text style={styles.greenText}>

              {langauge==='ar'?  " %"+Math.abs(percentage)+ " + " :  " + " + Math.abs(percentage) + "% "}
            </Text>
          ) : (
            (type === "impressions" || type === "accounts_engaged") && (
              <Text style={styles.redText}>
                 {langauge==='ar'?   " %" + Math.abs(percentage) +" - " :" - " + Math.abs(percentage) + "% "}
              </Text>
            )
          )}
        </Text>
        {type !== "impressions" && type !== "accounts_engaged" ? (
          <Text style={styles.grayText}>
            {percentage >= 0 ? translate('up') : translate('down')}{" "}
            <Text style={percentage >= 0 ? styles.greenText : styles.redText}>
              {langauge==='ar'? " %"+Math.abs(percentage)+' ' :Math.abs(percentage) + "% "}
            </Text>
           {this.state.dateType==='monthly'? translate('from_last_month'):this.state.dateType==='weekly'? translate('from_last_week'): translate('from_last_year')}
          </Text>
        ) : (
          type !== "accounts_engaged" && (
            <Text
              style={[
                styles.grayText,
                { textAlign: "center", paddingTop: Scale(15) }
              ]}
            >
            {translate('impressions_are_the_number')}
            </Text>
          )
        )}
      </View>
    );
  };

  render() {
    return (
      <View
        style={this.isPlatformWeb() ? styles.containerWeb : styles.container}
      >
        <SafeAreaView>
          <TouchableWithoutFeedback testID="hideKeyboardTouch" onPress={() => this.hideKeyboard()}>
            <>
              {this.header()}
              {this.dropDown()}
              <ScrollView
                scrollEnabled={true}
                nestedScrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:Scale(130)}}
                keyboardShouldPersistTaps="always"
              >
                {this.state.apiLoader ? (
                  <ActivityIndicator />
                ) : (
                  this.renderMainContainer()
                )}
              </ScrollView>
            </>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#FFFFFF"
  },
  titleTxt: {
    fontSize: Scale(18),
    fontWeight: "bold",
  },
  tableContainer: {
    marginTop: Scale(25),
    marginHorizontal: Scale(15)
  },
  notEnoughDataContainer: {
    flex: 1,
    width: "100%",
    height: height * 0.65,
    justifyContent: "center",
    alignItems: "center"
  },
  rectanglesContainer: {
    flexDirection: "row",
    width: 120,
    alignItems: "flex-end",
    marginBottom: Scale(15),

    justifyContent: "space-between"
  },
  rectangle: {
    borderWidth: 10,
    height: 50,
    borderColor: "#A7A7A7",
    width: 33
  },

  topContainer: {
    alignItems: "center"
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: Scale(15),
    backgroundColor: "#F4F4FE",
    marginVertical: Scale(8),
    paddingVertical: Scale(10),
    borderRadius: 10
  },
  tableHeader: {
    flexDirection: "row",

    justifyContent: "space-between"
  },
  performingImageContainer: {
    flexDirection: "row",
    height: ((width - 60) / 3) * 1.5
  },
  alignContents: {
    alignSelf:"flex-start"
  },
  contentsSharedMainContainer: {
    flex: 1
  },
  contentsShardContainer: {
    flexDirection: "row",

    height: (width / 3) * 1.5
  },
  postBlocksContainer: {
    borderTopWidth: 0.3,
    paddingTop: 20,
    marginTop: 20,
    borderColor: "#B4B4B4",
    zIndex: 12,
    height: ((width - 60) / 3) * 1.5 + 120,
  },
  topPerformingContainer: {
    borderTopWidth: 0.3,
    paddingTop: 20,
    marginTop: 20,
    borderColor: "#B4B4B4",
    width: "100%",
    paddingHorizontal: 15
  },
  progressBar: {
    flex: 1,
    marginBottom: Scale(10),
    alignItems: "center"
  },
  progressBarTitle: {
    flexDirection: "row",
    width: "100%",
    marginVertical: Scale(10),

    justifyContent: "space-between"
  },
  textAndValueRow: {
    width: "100%",
    marginTop: Scale(20),
    paddingTop: Scale(15),

    flexDirection: "row",
    justifyContent: "space-between"
  },
  progressBarText: { fontWeight: "400", fontSize: Scale(16) },
  chartContainer: {
    marginTop: 30,
    paddingRight: Scale(45),

    alignItems:'center'

  },
  bottomInfoContainer: {
    marginTop: 20,

    width: "100%",

    alignItems: "stretch"
  },
  bottomInfoTitle: {
    borderBottomWidth: 0.3,
    paddingBottom: 15,
    borderColor: "#B4B4B4"
  },
  viewsInfo: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center"
  },
  whiteText: {
    fontSize: Scale(18),
    color: "#FFFFFF"
  },
  axisTitle: { alignItems: "center" },
  bottomInfoTitleText: {
    alignItems: "center",
    fontWeight: "bold",
    fontSize: Scale(17)
  },
  leftAlign: {
    textAlign: "left",
  },
  dropdownContainer: {
    marginVertical: 15,

  },
  semiboldTitle: { fontSize: Scale(14), fontWeight: "400" },
  dateDropdownContainer: {
    flex:1,

    height:'100%',
    alignItems:'center',
    justifyContent:'center',
  },
  graphAxis: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: width,
    // marginLeft:Scale(40),
    alignSelf: "center",
    marginTop: -10,
    paddingHorizontal:Scale(10)
  },
  dropdownText: { fontSize: Scale(16) },
  dateDropdownText: { fontSize: Scale(16) },
  axisText: { fontSize: Scale(12) },
  standardText: {
    fontSize: Scale(14),
    textAlign: "center",
    maxWidth: width * 0.7
  },
  tableHeaderText: {
    fontSize: Scale(14),
    fontWeight: "600",
    marginBottom: Scale(10)
  },
  containerWeb: {
    padding: 16,
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 650
  },
  performanceMainContainer: {
    paddingHorizontal: 15,
    alignItems: "center",
    paddingBottom: Scale(15),
    flexDirection: "column"
  },
  headercontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Scale(0),
    height: Scale(45),

    width: "100%"
  },
  headerLeftContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",

    paddingHorizontal:Scale(15),

    height:'100%',
    flex: 1
  },
  headerRightContainer: {
    alignItems: "flex-start",
    alignContent:'stretch',
    flexDirection: "row",
    justifyContent: "flex-end",


    flex: 1.2,



  },
  dateTypeDropdown: {
    height: 35,
    justifyContent:'flex-start',
    flexDirection:'column-reverse',


    marginHorizontal:Scale(15),
    borderColor: "gray",
    minWidth:Scale(100),


  alignSelf:'flex-end',



    borderWidth: 0,
    borderRadius: 8,

  },
  headerText: {
    fontSize: Scale(16),
    lineHeight: Scale(30),
    fontWeight: "500"
  },
  bold: {
    fontWeight:"bold"
  },
  dateHeaderText:{
    fontSize: Scale(16),
    lineHeight: Scale(30),
    fontWeight: "bold",


    textAlign:'right',

  },
  bigTitle: {
    fontSize: Scale(45),
    lineHeight: Scale(65),
    fontWeight: "600"
  },
  grayText: {
    fontSize: Scale(14),
    lineHeight: Scale(24),
    fontWeight: "500",
    color: "#B4B4B4"
  },
  greenText: {
    fontSize: Scale(14),
    lineHeight: Scale(24),
    fontWeight: "600",
    color: "#89C8B3"
  },
  redText: {
    fontSize: Scale(14),
    lineHeight: Scale(24),
    fontWeight: "600",
    color: "#CD819B"
  },

  backarrow_style: {
    width: Scale(20),
    height: Scale(18),
    resizeMode: "contain"
  },
  backarrow_style_en: {
    width: Scale(25),
    height: Scale(25),
    resizeMode: "contain"
  },

  divider: {
    borderBottomColor: "#B7BBC0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: Scale(5)
  },
  title: {
    fontSize: Scale(16),
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    marginVertical: 8,
    marginHorizontal: 14
  },
  imageContainer: {
    marginTop: Scale(10),
    width: (width - 60) / 3,
    height: ((width - 60) / 3) * 1.5
  },
  imageContainerFull: {
    width: (width-30) / 3,
    height: (width / 3) * 1.5
  },
  bottom: {
    width: "100%",
    height: "100%",
    opacity: 0.5
  },
  top: {
    position: "absolute",
    left: "30%",
    top: "35%",
    opacity: 1,
    width: "100%",
    height: "100%"
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
    height: 160,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#FFC925",
    borderWidth: 0.5
  },
  textInput: {
    width: "80%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginVertical: Scale(15)
  },

  dropdown: {
    height: 35,
    marginHorizontal: 15,
    borderColor: "gray",
    backgroundColor: "#F4F4FE",
    borderRadius: 8,
    paddingHorizontal: 8,
    justifyContent:'center',
    flexDirection:'column-reverse',
  },

  icon: {
    marginRight: 5
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16,


    color: "#B4B4B4"
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  },
  accountsEngagedContainer: {
    width:"100%", 
    paddingHorizontal: 15
  },
  postsContainer: { 
    flexDirection: "column", 
    paddingBottom: Scale(110),
    width:"100%"
  },
  notEnoughData: {
    fontSize:Scale(14),
    color:'#B4B4B4',
    textAlign:'center'
  },
  contentsShared: { 
    flexDirection: "column",
    width:"100%",
    padding:15 
  }
});
// Customizable Area End
