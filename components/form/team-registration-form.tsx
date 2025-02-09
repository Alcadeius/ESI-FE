"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import { z } from "zod";
import { ICompetition } from "../types/competition";
import axiosInstance from "@/lib/axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const TeamSchema = z.object({
  competition_id: z.number(),
  team_name: z.string().min(1, "Team name is required"),
  no_hp: z.string().min(10, "Phone number is required"),
  team_members: z.array(
    z.object({
      name: z.string().min(1, "Player name is required"),
      id_game: z.string(),
      nickname: z.string().min(1, "Nickname is required"),
      position: z.enum(["leader", "player"]),
    })
  ).min(1, "A team must have at least 5 members"),
});

type TeamFormType = z.infer<typeof TeamSchema>;

const TeamRegistrationForm = ({ data }: { data: ICompetition }) => {
  const router = useRouter();
  const { control, handleSubmit, register } = useForm<TeamFormType>({
    resolver: zodResolver(TeamSchema),
    defaultValues: {
      competition_id: data?.id,
      team_name: "",
      no_hp: "",
      team_members: [
        { name: "", id_game: "", nickname: "", position: "leader" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "team_members",
  });

  const onSubmit = (formData: TeamFormType) => {
    try {
      axiosInstance.post("/registration", formData).then((res) => {
        Swal.fire({
          icon: "success",
          title: "Registration Success",
          text: res.data.message,
        });
        router.push('/order')
      }).catch(() => {throw new Error("Registration Failed")});
    } catch {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Please try again later",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="uppercase">{data.game.name}</CardTitle>
          <CardDescription>Judul game yang menjadi ajang pertandingan</CardDescription>
        </CardHeader>
      </Card>
      <Card className="p-4 space-y-2 border">
        <div>
          <label>Team Name / Nama Tim</label>
          <Input {...register("team_name")} placeholder="Enter Team Name" />
        </div>
        <div>
          <label>Phone Number / Nomor Handphone (Ketua)</label>
          <Input {...register("no_hp")} placeholder="Enter Contact Number" />
        </div>
      </Card>
      <div className="space-y-4" style={{ scrollbarWidth: "thin" }}>
        {fields.map((field, index) => (
          <Card key={field.id} className="p-4 space-y-2 border">
            <label>Player {index + 1}</label>
            <Input {...register(`team_members.${index}.name`)} placeholder="Player Name (Nama Lengkap Peserta)" />
            <Input {...register(`team_members.${index}.id_game`)} placeholder="Game ID" />
            <Input {...register(`team_members.${index}.nickname`)} placeholder="Nickname (Nama Akun/Nickname Game)" />

            <Controller
              name={`team_members.${index}.position`}
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Position" aria-readonly="true" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leader">Leader / Ketua Tim</SelectItem>
                    <SelectItem value="player">Player / Anggota Tim</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            {fields.length > 5 && (
              <Button variant="destructive" onClick={() => remove(index)}>
                Remove
              </Button>
            )}
          </Card>
        ))}

        {/* <Button onClick={() => append({ name: "", id_game: "", nickname: "", position: "player" })}>
          Add Player
        </Button> */}
        <Button type="submit" className="w-full text-white rounded-sm font-semibold hover:text-[#ff0000] bg-[#ff0000] justify-center items-center text-center p-3 transition-all hover:border-[#ff0000] border-transparent border hover:bg-transparent disabled:bg-red-700" disabled={!data.status?.is_open}>
          Lanjutkan
        </Button>
      </div>
    </form>
  );
}

export default TeamRegistrationForm;