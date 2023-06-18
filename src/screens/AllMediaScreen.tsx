import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import React, { useRef } from "react";
import { windowHeight, windowWidth } from "../constants/Dimensions";
import ImageCache from "../controllers/ImageCache";
import { timestamp } from "../types/redux/sliceTypes";
import MediaComponent from "../components/AllMediaScreenComponents/MediaComponent";

interface IMediaComponent {
  senderUniqueId: string;
  createdAt: timestamp;
  image: string;
}

interface ITimestampedMedia {
  timestamp: string;
  mediaArray: IMediaComponent[];
}

const AllMediaScreen = ({ route }: any) => {
  const timestampedMedia: ITimestampedMedia[] = [];

  // Group media objects by timestamp
  route?.params?.mediaArray.forEach((media: any) => {
    const createdDate = media.createdAt.toDate();
    const currentMonth = new Date().getMonth();
    const createdMonth = createdDate.getMonth();
    const createdYear = createdDate.getFullYear().toString();

    let timestamp: string;
    if (currentMonth === createdMonth) {
      timestamp = "This month";
    } else {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      timestamp = `${monthNames[createdMonth]} ${createdYear}`;
    }

    let existingTimestampedMedia = timestampedMedia.find(
      (item) => item.timestamp === timestamp
    );

    if (!existingTimestampedMedia) {
      existingTimestampedMedia = {
        timestamp,
        mediaArray: [],
      };
      timestampedMedia.push(existingTimestampedMedia);
    }

    existingTimestampedMedia.mediaArray.push(media);
  });

  const flatListRef = useRef<FlatList | null>(null);

  const enableScroll = route?.params?.mediaArray.length > windowHeight;

  const handleContentSizeChange = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <View>
      {route?.params?.mediaArray.length > 0 && (
        <ScrollView scrollEnabled={enableScroll}>
          <FlatList
            scrollEnabled={false}
            ref={(ref) => (flatListRef.current = ref)}
            data={timestampedMedia}
            keyExtractor={(item) => item.timestamp}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
                <FlatList
                  scrollEnabled={false}
                  horizontal
                  data={item.mediaArray}
                  keyExtractor={(media) => media.createdAt.toString()}
                  renderItem={({ item: media }) => (
                    <MediaComponent
                      image={media.image}
                      senderUniqueId={media.senderUniqueId}
                      createdAt={media.createdAt}
                    />
                  )}
                />
              </View>
            )}
            onContentSizeChange={handleContentSizeChange}
          />
        </ScrollView>
      )}

      <Text style={styles.text}>
        {route?.params?.mediaArray.length} pictures
      </Text>
    </View>
  );
};

export default AllMediaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timestamp: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    fontSize: 17,
    textAlign: "center",
    paddingTop: 15,
  },
});
