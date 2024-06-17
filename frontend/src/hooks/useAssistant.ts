import { useCallback } from "react";
import { useState } from "react";
import {
  AssistantSchema,
  djangoAiAssistantViewsGetAssistant,
} from "../client";

/**
 * React hook to manage the Assistants.
 */
export function useAssistant({ assistantId }: {
  assistantId: string;
}) {
  const [assistant, setAssistant] = useState<AssistantSchema | null>(null);
  const [loadingFetchAssistant, setLoadingFetchAssistant] =
    useState<boolean>(false);

  /**
   * Fetches a list of AI assistants.
   *
   * @returns A promise that resolves with the fetched list of AI assistants.
   */
  const fetchAssistant = useCallback(async (): Promise<AssistantSchema> => {
    try {
      setLoadingFetchAssistant(true);
      const fetchedAssistant = await djangoAiAssistantViewsGetAssistant({ assistantId });
      setAssistant(fetchedAssistant);
      return fetchedAssistant;
    } finally {
      setLoadingFetchAssistant(false);
    }
  }, [assistantId]);

  return {
    /**
     * Function to fetch an AI assistant from the server.
     */
    fetchAssistant,
    /**
     * Fetched AI assistant.
     */
    assistant,
    /**
     * Loading state of the fetch operation.
     */
    loadingFetchAssistant,
  };
}
