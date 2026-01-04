-- CreateTable
CREATE TABLE "RE_RuleGroup" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(155) NOT NULL,
    "description" VARCHAR(255),
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "domain" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RE_RuleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RE_Rule" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(155) NOT NULL,
    "description" VARCHAR(255),
    "priority" INTEGER NOT NULL DEFAULT 0,
    "decision_logic" JSONB NOT NULL DEFAULT '{}',
    "outcome" JSONB NOT NULL DEFAULT '{}',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RE_Rule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rule_Group_Rule" (
    "id" SERIAL NOT NULL,
    "group_id" INTEGER NOT NULL,
    "rule_id" INTEGER NOT NULL,

    CONSTRAINT "Rule_Group_Rule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rule_execution_logs" (
    "id" SERIAL NOT NULL,
    "group_id" INTEGER NOT NULL,
    "input_payload" JSONB NOT NULL,
    "output_payload" JSONB NOT NULL,
    "rules_triggered" JSONB NOT NULL,
    "execution_time" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rule_execution_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rule_Group_Rule" ADD CONSTRAINT "Rule_Group_Rule_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "RE_RuleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rule_Group_Rule" ADD CONSTRAINT "Rule_Group_Rule_rule_id_fkey" FOREIGN KEY ("rule_id") REFERENCES "RE_Rule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rule_execution_logs" ADD CONSTRAINT "rule_execution_logs_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "RE_RuleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
