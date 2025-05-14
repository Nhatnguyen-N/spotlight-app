import { COLORS } from "@/constants/theme";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/notifications.styles";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type NotificationProps = {
  sender: {
    _id: Id<"users"> | undefined;
    image: string | undefined; // or you could use `string` if it's a URI, or more specific type like `ImageSourcePropType`
    username: string | undefined;
  };
  type: "like" | "follow" | "comment"; // assuming these are the only possible types
  _creationTime: number; // or number if it's a timestamp
  comment?: string; // optional since it's only used for comment type
  post?: {
    imageUrl: string; // same as above - could be more specific
  } | null;
};

export default function Notification({
  notification,
}: {
  notification: NotificationProps;
}) {
  return (
    <View style={styles.notificationItem}>
      <View style={styles.notificationCotent}>
        <Link href={`/user/${notification.sender._id}`} asChild>
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={notification.sender.image!}
              style={styles.avatar}
              contentFit="cover"
              transition={200}
            />
            <View style={styles.iconBadge}>
              {notification.type === "like" ? (
                <Ionicons name="heart" size={14} color={COLORS.primary} />
              ) : notification.type === "follow" ? (
                <Ionicons name="person-add" size={14} color={"#8b5cf6"} />
              ) : (
                <Ionicons name="chatbubble" size={14} color={"#3b82f6"} />
              )}
            </View>
          </TouchableOpacity>
        </Link>
        <View style={styles.notificationInfo}>
          <Link href={`/user/${notification.sender._id}`} asChild>
            <TouchableOpacity>
              <Text style={styles.username}>
                {notification.sender.username}
              </Text>
            </TouchableOpacity>
          </Link>
          <Text style={styles.action}>
            {notification.type === "follow"
              ? "started following you"
              : notification.type === "like"
                ? "liked your post"
                : `commented: " ${notification.comment} "`}
          </Text>
          <Text style={styles.timeAgo}>
            {formatDistanceToNow(notification._creationTime, {
              addSuffix: true,
            })}
          </Text>
        </View>
      </View>
      {notification.post && (
        <Image
          source={notification.post.imageUrl}
          style={styles.postImage}
          contentFit="cover"
          transition={200}
        />
      )}
    </View>
  );
}
