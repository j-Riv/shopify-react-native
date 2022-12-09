import { useEffect, useState } from 'react';
import { Image, Dimensions } from 'react-native';

const Img = ({
  src,
  height = 80,
  width = 100,
  fullWidth = false
}: {
  src: string;
  height?: number | string;
  width?: number | string;
  fullWidth?: boolean;
}) => {
  const [size, setSize] = useState<{
    width: number | string;
    height: number | string;
  }>({ width, height });

  const handleSuccess = (width: number, height: number) => {
    const padding = 10;
    const screenWidth = Dimensions.get('window').width - padding;
    const scaleFactor = width / screenWidth;
    const imageHeight = height / scaleFactor;
    setSize({ width: screenWidth, height: imageHeight });
  };

  const handleFailure = (err: any) => console.log(err);

  useEffect(() => {
    if (fullWidth) Image.getSize(src, handleSuccess, handleFailure);
  }, []);

  return (
    <Image
      style={{
        width: size.width,
        height: size.height
      }}
      source={{ uri: src }}
    />
  );
};

export default Img;
