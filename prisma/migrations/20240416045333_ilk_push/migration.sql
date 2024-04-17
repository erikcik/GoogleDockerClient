-- CreateTable
CREATE TABLE `Restaurant` (
    `id` VARCHAR(191) NOT NULL,
    `detailedTitle` VARCHAR(191) NULL,
    `restaurantTitle` VARCHAR(191) NULL,
    `ratingOverall` VARCHAR(191) NULL,
    `ratingOverallNumber` VARCHAR(191) NULL,
    `restaurantWebsiteLink` VARCHAR(191) NULL,
    `locationAddress` VARCHAR(191) NULL,
    `restaurantLat` DOUBLE NULL,
    `restaurantLng` DOUBLE NULL,
    `isTripAdvisorVerified` BOOLEAN NULL,
    `priceSelector` VARCHAR(191) NULL,
    `restaurantEmail` VARCHAR(191) NULL,
    `telephoneNumber` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `openDates` (
    `id` VARCHAR(191) NOT NULL,
    `day` VARCHAR(191) NULL,
    `hours` VARCHAR(191) NULL,
    `restaurantId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `images` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NULL,
    `restaurantId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `id` VARCHAR(191) NOT NULL,
    `ratingPerson` VARCHAR(191) NULL,
    `ratingPersonType` VARCHAR(191) NULL,
    `ratingValue` INTEGER NULL,
    `ratingContent` LONGTEXT NULL,
    `restaurantId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoryList` (
    `id` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NULL,
    `restaurantId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `openDates` ADD CONSTRAINT `openDates_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categoryList` ADD CONSTRAINT `categoryList_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
