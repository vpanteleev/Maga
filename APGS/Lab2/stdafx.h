// stdafx.h : include file for standard system include files,
// or project specific include files that are used frequently, but
// are changed infrequently
//

#pragma once

#define WIN32_LEAN_AND_MEAN             // Exclude rarely-used stuff from Windows headers
// Windows Header Files:
#include <windows.h>



// TODO: reference additional headers your program requires here
#include <stdint.h>

extern "C" __declspec(dllexport) int32_t __cdecl swap_channels(
	int32_t image_depth, uint8_t* image, size_t image_size,
	bool bypass, bool swap_rg, bool swap_rb, bool swap_gb
);