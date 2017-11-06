#include <stdint.h>
#include "lab2.h"

//void main()
//{
//	uint8_t img[] = { 1, 2, 3, 1, 2, 3 };
//	swap_channels(24, img, 6, 0, 0, 0, 1);
//	for (size_t i = 0; i < 6; i++) {
//		std::cout << (int32_t)img[i] << ' ';
//	}
//	uint32_t tmp;
//	std::cin >> tmp;
//}

extern "C" __declspec(dllexport) int32_t swap_channels(
	int32_t image_depth, uint8_t* image, size_t image_size,
	bool bypass, bool swap_rg, bool swap_rb, bool swap_gb
) {
	constexpr int32_t supported_depth = 24;
	if (bypass || image_depth != supported_depth) {
		return 0;
	}

	int32_t swap_tagret_1;
	int32_t swap_tagret_2;
	if (swap_rg) {
		swap_tagret_1 = 0;
		swap_tagret_2 = 1;
	}
	else if (swap_rb) {
		swap_tagret_1 = 0;
		swap_tagret_2 = 2;
	}
	else if (swap_gb) {
		swap_tagret_1 = 1;
		swap_tagret_2 = 2;
	}
	else {
		return -1;
	}

	for (size_t i = 0; i < image_size; i += 3) {
		uint8_t tmp = image[i + swap_tagret_1];
		image[i + swap_tagret_1] = image[i + swap_tagret_2];
		image[i + swap_tagret_2] = tmp;
	}
	return 0;
}
