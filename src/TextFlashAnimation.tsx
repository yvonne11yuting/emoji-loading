import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

interface TextFlashAnimationProps extends List {
  duration?: number;
  size?: string;
}

interface List {
  itemList: string[];
}

const TextChanger = ({ itemList }: List) => {
  const textLen = itemList.length;
  const eachFrame = 100 / textLen;
  const frames = itemList.reduce((acc, curVal, curIdx) => {
    const percentage = curIdx === 0 ? "0%, 100%" : `${curIdx * eachFrame}%`;
    const content = `${percentage} { content: "${curVal}" }`;
    return acc + content;
  }, "");
  return keyframes`${frames}`;
};

const StyledList = styled.div<TextFlashAnimationProps>`
  position: relative;
  display: inline-flex;
  justify-content: center;
  min-width: 100px;
  width: inherit;
  height: ${({ size }) => size};
  font-family: "Noto Sans CJK TC", "Microsoft JhengHei", PingFang, STHeiti,
    sans-serif, serif;

  &::before {
    content: "";
    position: absolute;
    display: inline-block;
    font-size: ${({ size }) => size};
    text-align: center;
    white-space: nowrap;
    animation: ${({ itemList }) => TextChanger({ itemList })}
      ${({ duration }) => `${duration}s`} steps(10, end) infinite;
  }
`;

function TextFlashAnimation({
  itemList,
  duration = 0,
  size = "4rem"
}: TextFlashAnimationProps) {
  return (
    <StyledList
      itemList={itemList}
      duration={duration || itemList.length}
      size={size}
    />
  );
}

export default TextFlashAnimation;
