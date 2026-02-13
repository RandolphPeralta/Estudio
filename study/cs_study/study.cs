struct EMPLOYEE {
    char szFirstName[25];
    char szLastName[25];
    int iAge;
    double dPayRate;
};

void main() {
    double dTotalPay;
    struct EMPLOYEE *pEmp;
    pEmp = (struct EMPLOYEE*)malloc(sizeof(struct EMPLOYEE));

    if (pEmp) {
        pEmp->dPayRate = 100;
        strcpy(pEmp->szFirstName, "Amy");
        strcpy(pEmp->szLastName, "Anderson");
        pEmp->iAge = 28;

        dTotalPay = pEmp->dPayRate * 40;
        printf("La paga total para %s %s es %.2f\n",
                pEmp->szFirstName, pEmp->szLastName, dTotalPay);

        free(pEmp);
    }
}
