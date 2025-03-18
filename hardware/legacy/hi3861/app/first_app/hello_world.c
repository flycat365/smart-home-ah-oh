#include <stdio.h>
#include "ohos_init.h"
#include "ohos_types.h"
#include "cmsis_os2.h"

void HelloWorld(void) {
    printf("[DEMO] Hello world!\n");
}

SYS_RUN(HelloWorld);