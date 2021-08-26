import { HStack, Image, Text } from "@chakra-ui/react";

interface BlogAuthorProps {
  date: Date;
  name: string;
  pfp?: string;
  singlePostVariant?: boolean;
}

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src={
          props.pfp
            ? props.pfp
            : "https://i2-prod.mirror.co.uk/incoming/article9536038.ece/ALTERNATES/s615/1_Grim-Reaper.jpg"
        }
        alt={`Avatar of ${props.name}`}
      />
      {!props.singlePostVariant ? (
        <>
          <Text fontWeight="medium">{props.name}</Text>
          <Text>—</Text>
          <Text>{props.date.toLocaleDateString()}</Text>
        </>
      ) : (
        <>
          <Text fontWeight="medium" color="white">
            {props.name}
          </Text>
          <Text color="white">—</Text>
          <Text color="white">{props.date.toLocaleDateString()}</Text>
        </>
      )}
    </HStack>
  );
};
