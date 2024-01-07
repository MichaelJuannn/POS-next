CREATE TABLE `items` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`price` integer,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `items_orders` (
	`items_id` text NOT NULL,
	`orders_id` integer NOT NULL,
	PRIMARY KEY(`items_id`, `orders_id`),
	FOREIGN KEY (`items_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`orders_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`data` integer
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY DEFAULT uuid() NOT NULL,
	`username` text,
	`password` text,
	`roles` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);