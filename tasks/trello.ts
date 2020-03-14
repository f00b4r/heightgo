import _ from "lodash";
import logger from "@app/logger";
import { fetchBoardCards, fetchCardActions } from "@app/services/trello";
import { createTask, createActivity } from "@app/services/height";
import CONFIG from "@app/config";

async function main(): Promise<void> {
  if (!CONFIG.trello) {
    throw "Missing trello config";
  }
  if (!CONFIG.height) {
    throw "Missing height config";
  }

  // @logging
  logger('Fetching trello cards');

  // #1 Fetch trello cards
  const cards = await fetchBoardCards(CONFIG.trello.boardId);

  // @logging
  logger(`Fetched ${cards.length} cards`);

  // #2 Put cards to height.app
  // Create tasks from all cards
  for await (const card of cards) {
    // @logging
    logger(`Fetching actions for card ${card.id}`);

    // Fetch card actions
    const actions = await fetchCardActions(card.id);

    // Create new task at height.app
    const task = await createTask({
      name: card.name,
      listId: CONFIG.height!.list,
      description: card.desc,
    });

    // @logging
    logger(`New task ${task.id} created`);

    // Create new activity at height.app
    for await (const action of actions) {
      if (action.type !== 'commentCard') {
        logger(`New task ${task.id} activity ${action.type} skipped`);
        continue;
      }

      const activity = await createActivity({
        taskId: task.id!,
        type: 'comment',
        message: action.data.text,
      });

      // @logging
      logger(`New task ${task.id} activity ${activity.id} created`);
    }
  }

}

// @wanted
(async () => main())();
