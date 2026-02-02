import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface RoomGalleryProps {
  images: string[];
  editable?: boolean;
  onImagePress?: (index: number) => void;
  onDeleteImage?: (index: number) => void;
  onAddImage?: () => void;
  style?: ViewStyle;
}

export const RoomGallery: React.FC<RoomGalleryProps> = ({
  images,
  editable = false,
  onImagePress,
  onDeleteImage,
  onAddImage,
  style,
}) => {
  const theme = useAppTheme();
  const [viewerVisible, setViewerVisible] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleImagePress = (index: number) => {
    setViewerIndex(index);
    setViewerVisible(true);
    onImagePress?.(index);
  };

  const handleDeletePress = (index: number, event: any) => {
    event.stopPropagation();
    onDeleteImage?.(index);
  };

  const handleAddPress = () => {
    onAddImage?.();
  };

  const renderImage = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => handleImagePress(index)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
      {editable && (
        <TouchableOpacity
          style={[styles.deleteButton, { backgroundColor: theme.colors.error }]}
          onPress={e => handleDeletePress(index, e)}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={16} color={theme.colors.onError} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  const renderAddButton = () => (
    <TouchableOpacity
      style={[
        styles.imageContainer,
        styles.addButton,
        {
          backgroundColor: theme.colors.surfaceVariant,
          borderWidth: 2,
          borderColor: theme.colors.outline,
          borderStyle: 'dashed',
        },
      ]}
      onPress={handleAddPress}
      activeOpacity={0.7}
    >
      <Ionicons name="add" size={32} color={theme.colors.onSurfaceVariant} />
    </TouchableOpacity>
  );

  const renderPagination = () => {
    if (images.length <= 1) return null;
    return (
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor:
                  index === currentIndex ? theme.colors.primary : theme.colors.outlineVariant,
                width: index === currentIndex ? 8 : 6,
                height: index === currentIndex ? 8 : 6,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  if (images.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
        <Ionicons name="image-outline" size={48} color={theme.colors.onSurfaceVariant} />
        <Text style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
          No images yet
        </Text>
        {editable && (
          <TouchableOpacity
            style={[styles.addEmptyButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleAddPress}
          >
            <Text style={[styles.addEmptyButtonText, { color: theme.colors.onPrimary }]}>
              Add Images
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderImage}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        ListFooterComponent={editable ? renderAddButton : null}
      />
      {renderPagination()}

      <Modal
        visible={viewerVisible}
        transparent={true}
        onRequestClose={() => setViewerVisible(false)}
      >
        <ImageViewer
          imageUrls={images.map(url => ({ url }))}
          index={viewerIndex}
          enableSwipeDown
          onSwipeDown={() => setViewerVisible(false)}
          renderIndicator={(current, total) => (
            <View style={{ position: 'absolute', top: 50, alignSelf: 'center' }}>
              <Text style={{ color: theme.colors.onSurface, fontSize: 16 }}>
                {current} / {total}
              </Text>
            </View>
          )}
          renderHeader={index => (
            <View style={styles.viewerHeader}>
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: theme.colors.surface + 'CC' }]}
                onPress={() => setViewerVisible(false)}
              >
                <Ionicons name="close" size={24} color={theme.colors.onSurface} />
              </TouchableOpacity>
            </View>
          )}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: 250,
    marginRight: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  deleteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  paginationDot: {
    borderRadius: 4,
  },
  emptyContainer: {
    width: SCREEN_WIDTH,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
  },
  addEmptyButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addEmptyButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  viewerHeader: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
