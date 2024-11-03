import type { Maybe, PublicationMetadataMedia } from "@tape.xyz/lens";

export const getAttachmentsData = (
  attachments?: Maybe<PublicationMetadataMedia[]>
): { uri: string; type: string }[] => {
  if (!attachments) {
    return [];
  }

  return attachments.flatMap((attachment) => {
    switch (attachment.__typename) {
      case "PublicationMetadataMediaImage":
        return [
          {
            uri: attachment.image.optimized?.uri,
            type: "Image"
          }
        ];
      case "PublicationMetadataMediaVideo":
        return [
          {
            uri: attachment.video.optimized?.uri,
            type: "Video"
          }
        ];
      case "PublicationMetadataMediaAudio":
        return [
          {
            uri: attachment.audio.optimized?.uri,
            type: "Audio"
          }
        ];
      default:
        return [];
    }
  });
};
