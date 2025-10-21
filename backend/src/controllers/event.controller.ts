import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandlerAndValidation } from "../middlewares/withValidation.middleware"; // Modified import

// DTOs
import {
  CreateEventDto,
  EventIdDTO,
  UserNameAndSlugDTO,
  UserNameDTO,
} from "../database/dto/event.dto";
import {
  createEventService,
  deleteEventService,
  getPublicEventByUsernameAndSlugService,
  getPublicEventsByUsernameService,
  getUserEventsService,
  toggleEventPrivacyService,
} from "../services/event.service";
import { asyncHandler } from "../middlewares/asyncHandler.middeware";

// Create Event Controller
export const createEventController = asyncHandlerAndValidation(
  CreateEventDto,
  "body",
  async (req: Request, res: Response, createEventDto) => {
    const userId = req.user?.id as string;

    // Call service to create event
    const event = await createEventService(userId, createEventDto);
    // Return response to client
    return res.status(HTTPSTATUS.CREATED).json({
      message: "Event created successfully",
      event,
    });
  }
);

// Get User Events Controller
export const getUserEventsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    const { events, username } = await getUserEventsService(userId);

    // Return response to client 
    return res.status(HTTPSTATUS.OK).json({
      message: "User event fetched successfully",
      data: {
        events,
        username,
      },
    });
  }
);

// Toggle Event Privacy Controller
export const toggleEventPrivacyController = asyncHandlerAndValidation(
  EventIdDTO,
  "body",
  async (req: Request, res: Response, eventIdDto) => {
    // Get user ID from request
    const userId = req.user?.id as string;
    // Call service to toggle event privacy
    const event = await toggleEventPrivacyService(userId, eventIdDto.eventId);

    // Return response to client
    return res.status(HTTPSTATUS.OK).json({
      message: `Event set to ${
        event.isPrivate ? "private" : "public"
      } successfully`,
    });
  }
);

// Get Public Events by Username Controller
export const getPublicEventsByUsernameController = asyncHandlerAndValidation(
  UserNameDTO,
  "params",
  // Controller logic 
  async (req: Request, res: Response, userNameDto) => {
    // Call service to get public events by username
    const { user, events } = await getPublicEventsByUsernameService(
      userNameDto.username
    );

    // Return response to client
    return res.status(HTTPSTATUS.OK).json({
      message: "Public events fetched successfully",
      user,
      events,
    });
  }
);

// Get Public Event by Username and Slug Controller
export const getPublicEventByUsernameAndSlugController =
  asyncHandlerAndValidation(
    UserNameAndSlugDTO,
    "params",
    async (req: Request, res: Response, userNameAndSlugDto) => {
      const event = await getPublicEventByUsernameAndSlugService(
        userNameAndSlugDto
      );

      // Return response to client
      return res.status(HTTPSTATUS.OK).json({
        message: "Event details fetched successfully",
        event,
      });
    }
  );

  // Delete Event Controller
export const deleteEventController = asyncHandlerAndValidation(
  EventIdDTO,
  "params",
  async (req: Request, res: Response, eventIdDto) => {
    const userId = req.user?.id as string;

    // Call service to delete event
    await deleteEventService(userId, eventIdDto.eventId);
    // Return response to client
    return res.status(HTTPSTATUS.OK).json({
      message: "Event deleted successfully",
    });
  }
);
