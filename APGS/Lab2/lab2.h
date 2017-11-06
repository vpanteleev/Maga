#pragma once
#include <stdint.h>

#ifdef __cplusplus
extern "C" {  // only need to export C interface if
			  // used by C++ source code
#endif

__declspec(dllexport) int32_t swap_channels(
	int32_t image_depth, uint8_t* image, size_t image_size,
	bool bypass, bool swap_rg, bool swap_rb, bool swap_gb
);

#ifdef __cplusplus  
}
#endif
