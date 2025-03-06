"use client";
import {
  Box,
  Flex,
  Grid,
  IconButton,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
// import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { MdDownload, MdShare, MdShuffle } from "react-icons/md";

const generateBlobPath = (points: number, randomness: number) => {
  const angleStep = (Math.PI * 2) / points;
  const radius = 50;
  let path = "M";

  for (let i = 0; i <= points; i++) {
    const angle = angleStep * i;
    const noise = Math.random() * randomness;
    const x = Math.cos(angle) * (radius + noise) + 50;
    const y = Math.sin(angle) * (radius + noise) + 50;
    path += `${x} ${y} `;
  }

  return path + "Z";
};

export default function BlobGenerator() {
  const [points, setPoints] = useState(10);
  const [randomness, setRandomness] = useState(15);
  const [speed, setSpeed] = useState(5);
  const [color, setColor] = useState("#FF6B6B");
  const [blobPath, setBlobPath] = useState("");

  const generateNewBlob = useCallback(() => {
    setBlobPath(generateBlobPath(points, randomness));
  }, [points, randomness]);

  useEffect(() => {
    generateNewBlob();
    const interval = setInterval(generateNewBlob, speed * 1000);
    return () => clearInterval(interval);
  }, [generateNewBlob, speed]);

  const handleRandomize = () => {
    setPoints(Math.floor(Math.random() * 15 + 5));
    setRandomness(Math.random() * 30);
    setSpeed(Math.random() * 10 + 2);
    setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  };

  const handleShare = () => {
    const params = new URLSearchParams({
      p: points.toString(),
      r: randomness.toString(),
      s: speed.toString(),
      c: color,
    });
    navigator.clipboard.writeText(`${window.location.origin}?${params}`);
  };

  const handleDownload = () => {
    const svg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path fill="${color}" d="${blobPath}"/>
    </svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    // saveAs(blob, "blob.svg");
  };

  return (
    <Flex direction="column" align="center" minH="100vh" p={4} gap={6}>
      <Box w={["100%", "400px"]} h="400px">
        <motion.svg
          viewBox="0 0 100 100"
          style={{ width: "100%", height: "100%" }}
          animate={{ d: blobPath }}
          transition={{ duration: speed / 2 }}
        >
          <path fill={color} d={blobPath} />
        </motion.svg>
      </Box>

      <Grid templateColumns="repeat(3, 1fr)" gap={4} w={["100%", "400px"]}>
        <IconButton
          aria-label="Randomize"
          icon={<MdShuffle />}
          onClick={handleRandomize}
        />
        <IconButton
          aria-label="Share"
          icon={<MdShare />}
          onClick={handleShare}
        />
        <IconButton
          aria-label="Download"
          icon={<MdDownload />}
          onClick={handleDownload}
        />
      </Grid>

      <Box w={["100%", "400px"]}>
        <Input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          w="100%"
          h="50px"
        />
      </Box>

      <Box w={["100%", "400px"]}>
        <Slider value={points} min={5} max={20} onChange={setPoints}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb>Points</SliderThumb>
        </Slider>
      </Box>

      <Box w={["100%", "400px"]}>
        <Slider value={randomness} min={0} max={30} onChange={setRandomness}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb>Randomness</SliderThumb>
        </Slider>
      </Box>

      <Box w={["100%", "400px"]}>
        <Slider value={speed} min={1} max={10} onChange={setSpeed}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb>Speed</SliderThumb>
        </Slider>
      </Box>
    </Flex>
  );
}
